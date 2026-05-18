"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TopNavigation } from "@/app/components/TopNavigation";
import { TabGroup } from "@/app/components/Tab";
import { ChipsFilter } from "@/app/components/Chip";
import { OrderSection } from "@/app/components/Module";
import { ActionArea } from "@/app/components/ActionArea";
import { Icon } from "@/app/components/Icon";

/**
 * /home — 리뷰 작성 가능 목록 랜딩 페이지
 *
 * Figma reference:
 * - 테스트 페이지 › UX_07_086_매장   (store mode)
 * - 테스트 페이지 › UX_07_086_다이소몰 (daiso mode)
 *
 * 구조 (Figma 원본 1:1)
 * - TopNavigation (DDS)
 * - UserRankingHeader (local composition — Module.tsx 승격 보류)
 * - TabGroup (DDS — 작성 가능한 / 내가 작성한)
 * - 본문 (white):
 *     - ReviewIncentiveBanner + 리뷰 정책 link (local composition)
 *     - ChipsFilter (DDS) ← 모드 switching trigger
 *     - OrderSection × N (DDS) ← 모드에 따라 dataset 만 교체
 * - ActionArea "더보기" (tertiary + chevron-down — 확장된 variant)
 *
 * Mode switching
 * - `daiso` | `store` 2-state, 단일 선택 (toggle-off 차단)
 * - chip 클릭 → ChipsFilter onChange → setMode → MOCK_REVIEWS[mode] 렌더
 * - 공통 section 전 영역은 한 번만 정의. 카드 list 만 conditional dataset.
 * - 모드 확장 (예: future "구독" / "선물" tab) 시 ReviewMode 유니언과
 *   CHIP_INDEX_BY_MODE / MOCK_REVIEWS / MOCK_CHIPS 만 확장하면 됨.
 *
 * 매장 vs 다이소몰 카드 시각 차이
 * - 매장   : kind="store-only" — 회색 store icon placeholder
 * - 다이소몰: kind="all-case"  — image + delivery badge (택배) + 입고일
 *           Module.tsx ReviewCard (delivery + date 다줄 layout)
 *
 * Mock data 와 UI 구조 분리
 * - MOCK_USER / MOCK_TABS / MOCK_CHIPS : 공통
 * - MOCK_REVIEWS                       : Record<ReviewMode, ReviewItem[]>
 *
 * Local-only assets (재사용 시점에 DDS 승격 예정 — 현 /home only)
 * - IcoReview             : ico_review SVG (16×16 brand-red bg + white pen)
 * - UserRankingHeader     : Profile + 랭킹 + 통계 헤더
 * - ReviewIncentiveBanner : 리뷰 작성 인센티브 배너
 *
 * Token 사용 원칙
 * - 색·spacing·radius·typography 모두 globals.css `@theme` 토큰
 * - 신규 hex / 임의 px / inline style 없음.
 *   단, DDS spacing scale 외 값 (54px Profile) 은 기존 패턴인
 *   `calc(var(--spacing-scale-48) + var(--spacing-scale-6))` 토큰 합성으로 처리.
 *
 * Responsive
 * - 모바일-only 디자인 — full-width flex column. PC layout 정의 없음.
 *   (foundation: breakpoint-pc 1024 / container-pc 1280 — 본 페이지 미사용)
 *
 * Layout jump
 * - 모드 전환 시 카드 height 가 ~10px 정도 늘어남 (delivery+date 다줄 라인).
 *   ActionArea 가 flex column 마지막 child 라 reflow 흡수. min-height 고정
 *   없이 자연 흐름 — 사용자 인지 가능한 jump 최소화 수준.
 */

// ──────────────────────────────────────────────────────────────
// Mock data (UI 구조와 분리)
// ──────────────────────────────────────────────────────────────

type UserStat = { label: string; count: number };

/** 리뷰 모드 — ChipsFilter 와 1:1 매핑 (확장 시 유니언만 늘리면 됨). */
type ReviewMode = "daiso" | "store";

type ReviewItem = {
  id: string;
  productName: string;
  rating: number;
  deadline: React.ReactNode;
  state: "default" | "in-progress";
  pointsLabel?: string;
  /** store-only → store icon, all-case → image 슬롯 사용 */
  kind: "store-only" | "all-case";
  /** all-case 일 때 이미지 ReactNode */
  image?: React.ReactNode;
  /** all-case 전용 배송 유형 (현재 "normal" 만 지원 — Module.tsx 와 일치) */
  delivery?: "normal";
  /** all-case 전용 입고일 (e.g. "2025-07-18") */
  date?: string;
};

const MOCK_USER: { ranking: string; stats: UserStat[] } = {
  ranking: "566,288",
  stats: [
    { label: "완전꿀팁", count: 3 },
    { label: "구매욕상승", count: 31 },
    { label: "궁금증해결", count: 6 },
  ],
};

const MOCK_TABS: { label: string; count: number | string }[] = [
  { label: "작성 가능한 리뷰", count: 12 },
  { label: "내가 작성한 리뷰", count: "99+" },
];

/**
 * ChipsFilter chip 배열. 인덱스 순서는 CHIP_INDEX_BY_MODE 와 정합.
 * (다이소몰 = 0, 매장 = 1)
 */
const MOCK_CHIPS = [
  { label: "다이소몰 구매 8" },
  { label: "매장 구매 4" },
];

/** ChipsFilter 인덱스 ↔ ReviewMode 양방향 매핑. */
const CHIP_INDEX_BY_MODE: Record<ReviewMode, number> = {
  daiso: 0,
  store: 1,
};

/**
 * 오늘 마감 deadline — 매장/다이소몰 첫 카드 공용.
 * "(오늘까지)" 부분만 brand-red 강조. ReactNode 로 정의해 OrderSection
 * 의 font-bold 가 outer 에서 inherited 되도록 함.
 */
const DEADLINE_TODAY: React.ReactNode = (
  <>
    {"2025-07-04 "}
    <span className="text-palette-brand-red">(오늘까지)</span>
  </>
);

const DEADLINE_D24 = "2025-07-04 (D-24)";

/**
 * 모드별 리뷰 리스트.
 * - store : Figma UX_07_086_매장   — store icon placeholder (kind=store-only)
 * - daiso : Figma UX_07_086_다이소몰 — image + 택배 badge + 입고일 (kind=all-case)
 */
const MOCK_REVIEWS: Record<ReviewMode, ReviewItem[]> = {
  store: [
    {
      id: "store-r1",
      productName: "닥터오라클 큐어소나 쿨링코드 더마쿨러",
      rating: 0,
      deadline: DEADLINE_TODAY,
      state: "default",
      kind: "store-only",
    },
    {
      id: "store-r2",
      productName: "닥터오라클 큐어소나 쿨링코드 더마쿨러",
      rating: 0,
      deadline: DEADLINE_D24,
      state: "default",
      kind: "store-only",
    },
    {
      id: "store-r3",
      productName: "여행용 접이식 숄더백 블랙",
      rating: 0,
      deadline: DEADLINE_D24,
      state: "default",
      kind: "all-case",
      image: (
        <Image
          src="/dummy-shoulder-bag.png"
          alt=""
          width={52}
          height={52}
          className="size-full object-cover"
        />
      ),
    },
    {
      id: "store-r4",
      productName: "닥터오라클 큐어소나 쿨링코드 더마쿨러",
      rating: 5,
      deadline: DEADLINE_D24,
      state: "in-progress",
      pointsLabel: "24P",
      kind: "store-only",
    },
  ],
  daiso: [
    {
      id: "daiso-r1",
      productName: "마미케어 바다포도 스킨팩 80매",
      rating: 0,
      deadline: DEADLINE_TODAY,
      state: "default",
      kind: "all-case",
      delivery: "normal",
      date: "2025-07-18",
      image: (
        <Image
          src="/dummy-skinpack.png"
          alt=""
          width={52}
          height={52}
          className="size-full object-cover"
        />
      ),
    },
    {
      id: "daiso-r2",
      productName: "닥터오라클 큐어소나 쿨링코드 더마쿨러",
      rating: 0,
      deadline: DEADLINE_D24,
      state: "default",
      kind: "all-case",
      delivery: "normal",
      date: "2025-07-18",
      image: (
        <Image
          src="/dummy-cooler.png"
          alt=""
          width={52}
          height={52}
          className="size-full object-cover"
        />
      ),
    },
    {
      id: "daiso-r3",
      productName: "여행용 접이식 숄더백 블랙",
      rating: 0,
      deadline: DEADLINE_D24,
      state: "default",
      kind: "all-case",
      delivery: "normal",
      date: "2025-07-18",
      image: (
        <Image
          src="/dummy-shoulder-bag.png"
          alt=""
          width={52}
          height={52}
          className="size-full object-cover"
        />
      ),
    },
    {
      id: "daiso-r4",
      productName: "[콜라겐]올리브팜 에센셜 마스크 시트",
      rating: 5,
      deadline: DEADLINE_D24,
      state: "in-progress",
      pointsLabel: "24P",
      kind: "all-case",
      delivery: "normal",
      date: "2025-07-18",
      image: (
        <Image
          src="/dummy-mask-sheet.png"
          alt=""
          width={52}
          height={52}
          className="size-full object-cover"
        />
      ),
    },
  ],
};

// ──────────────────────────────────────────────────────────────
// Local-only SVG: ico_review
// (DDS Icon.tsx 추가 보류 — 페이지 local asset 처리)
//
// fill 은 모두 tailwind fill-* utility 로 토큰 매핑.
// 신규 hex 0건 (brand-red / text-white 토큰 사용).
// ──────────────────────────────────────────────────────────────

function IcoReview() {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="shrink-0"
    >
      <rect
        width={16}
        height={16}
        rx={2}
        className="fill-palette-brand-red"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2788 6.12415L9.76097 3.8L3.65234 9.43873L3.65459 11.7608H3.65728V11.864L11.9936 11.8645V11.2426H6.73383L12.2788 6.12415Z"
        className="fill-semantic-text-white"
      />
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────
// Local composition: UserRankingHeader
// Module.tsx 승격은 추후 (현재 /home only).
// ──────────────────────────────────────────────────────────────

function UserRankingHeader({
  ranking,
  stats,
}: {
  ranking: string;
  stats: UserStat[];
}) {
  // ranking 라인의 각 segment 공통 typography
  // (Figma: SUITE Bold 16/22 — Heading 5/Bold 토큰 1:1)
  //
  // `font-display` 명시 필요 — Tailwind v4 에서 `--text-{name}--font-family`
  // modifier 는 text-* utility 에 auto-apply 되지 않음 (size/line-height/
  // letter-spacing/font-weight 만 auto). body default 가 Pretendard 이므로
  // SUITE family 적용 위해서는 font-display utility 직접 부여 필요.
  const rankingSegmentClass =
    "font-display text-heading-5 font-bold whitespace-nowrap text-semantic-text-primary";

  return (
    <section className="flex w-full flex-col px-semantic-page-margin pb-16">
      <div className="flex w-full items-center gap-12">
        {/* Profile — 54×54 (DDS spacing scale 외 → 48+6 토큰 합성)
            Figma: bg-gray-300 + dim-black-subtle border + rounded-pill */}
        <div
          className="relative flex shrink-0 items-center justify-center rounded-pill border border-semantic-dim-black-subtle bg-palette-gray-300"
          style={{
            width: "calc(var(--spacing-scale-48) + var(--spacing-scale-6))",
            height: "calc(var(--spacing-scale-48) + var(--spacing-scale-6))",
          }}
        >
          {/* profile icon — Figma asset fill default `white`.
              semantic-text-white (= palette-brand-white #ffffff) 매핑. */}
          <Icon
            name="profile"
            size={32}
            className="text-semantic-text-white"
            aria-label="프로필"
          />
          {/* ico_edit badge — 16×16, bottom-right overlap
              Figma 원본 좌표: right=-1px / bottom=1px (살짝 overlap)
              ico_write fill: Figma asset default `#28323C` = palette-gray-700
              (semantic 매핑 없음 — 정확한 fill 매칭 위해 palette 직접 사용) */}
          <div className="absolute -right-px bottom-px flex size-16 items-center justify-center rounded-pill border border-palette-gray-600 bg-semantic-background-base-white">
            <Icon
              name="write"
              size={10}
              className="text-palette-gray-700"
              aria-label="프로필 편집"
            />
          </div>
        </div>

        {/* Right content — ranking + stats (vertical gap-4) */}
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          {/* Ranking line — Figma: flex gap-2, 3개 text segment + tooltip.
              segment 별로 분리해야 (space char 가 아닌) 정확한 2px gap 확보. */}
          <div className="flex w-full items-center gap-2">
            <span className={rankingSegmentClass}>나의 랭킹은</span>
            <span className={rankingSegmentClass}>{ranking}</span>
            <span className={rankingSegmentClass}>등이에요</span>
            <Icon
              name="tooltip"
              size={16}
              className="shrink-0 text-semantic-text-secondary"
              aria-label="랭킹 안내"
            />
          </div>

          {/* Stats line — Caption 1, gap-8 (Frame↔Divider↔Frame)
              Figma divider: vertical 1px hairline gray-400, height 10px */}
          <div className="flex w-full flex-wrap items-center gap-8">
            {stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                <div className="flex items-center gap-2">
                  <span className="text-caption-1 font-regular text-semantic-text-secondary">
                    {stat.label}
                  </span>
                  <span className="text-caption-1 font-bold text-semantic-text-primary">
                    {stat.count}
                  </span>
                </div>
                {i < stats.length - 1 && (
                  <span
                    className="h-10 w-px bg-palette-gray-400"
                    aria-hidden
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────
// Local composition: ReviewIncentiveBanner
// (review_options 배너 — 리뷰 작성 인센티브 안내)
// ──────────────────────────────────────────────────────────────

function ReviewIncentiveBanner({ pointsLabel }: { pointsLabel: string }) {
  return (
    <div className="flex w-full items-center gap-8 rounded-small bg-semantic-background-grouped px-12 py-6">
      <div className="flex items-center gap-6">
        <IcoReview />
        <p className="text-caption-1 font-medium text-semantic-text-primary">
          리뷰 작성하고{" "}
          <span className="font-bold text-palette-brand-red">
            최대 {pointsLabel}
          </span>{" "}
          받아가세요.
        </p>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// /home page
// ──────────────────────────────────────────────────────────────

export default function HomePage() {
  const router = useRouter();

  /**
   * 매장 / 다이소몰 모드 state.
   * - default: "store" (UX_07_086_매장 frame 과 동일)
   * - chip 클릭 시 setMode 로 전환 → MOCK_REVIEWS[mode] 렌더링
   */
  const [mode, setMode] = React.useState<ReviewMode>("store");
  const currentReviews = MOCK_REVIEWS[mode];

  /**
   * 별점 영역 클릭 → 리뷰 작성 페이지 (/review/write) 로 이동.
   * 추후 productId 기반 deep-link 가 필요하면 query 추가 (e.g.
   * `/review/write?productId=${reviewId}`).
   */
  const handleRatingClick = (_reviewId: string) => {
    router.push("/review/write");
  };

  /**
   * ChipsFilter onChange handler.
   * - single mode 라 indices.length 는 0 또는 1.
   * - 빈 배열 (현재 선택된 chip 을 다시 클릭한 toggle-off) 은 무시 →
   *   항상 하나의 모드가 선택된 상태 유지.
   */
  const handleChipChange = (indices: number[]) => {
    if (indices.length === 0) return;
    const idx = indices[0];
    const next: ReviewMode | undefined = (
      Object.entries(CHIP_INDEX_BY_MODE) as [ReviewMode, number][]
    ).find(([, i]) => i === idx)?.[0];
    if (next) setMode(next);
  };

  return (
    <main className="flex min-h-screen w-full flex-col bg-palette-gray-200">
      <TopNavigation
        title="리뷰"
        onLeadingClick={() => {
          if (typeof window !== "undefined") window.history.back();
        }}
      />

      <UserRankingHeader
        ranking={MOCK_USER.ranking}
        stats={MOCK_USER.stats}
      />

      <TabGroup tabs={MOCK_TABS} defaultSelectedIndex={0} />

      {/* 본문 — white bg, semantic page-margin */}
      <section className="flex w-full flex-col gap-24 bg-semantic-background-base-white px-semantic-page-margin py-16">
        {/* fixarea — 인센티브 배너 + 리뷰 정책 링크 */}
        <div className="flex flex-col gap-12">
          <ReviewIncentiveBanner pointsLabel="1,000P" />
          <button
            type="button"
            className="inline-flex items-center gap-2 self-start text-body-7 font-medium text-semantic-text-secondary"
          >
            <span>리뷰 정책</span>
            <Icon
              name="tooltip"
              size={16}
              aria-label="리뷰 정책 안내"
            />
          </button>
        </div>

        {/* wrapper — chip 필터 + 카드 리스트
            chip↔list gap = module-set-mo (16) */}
        <div className="flex flex-col gap-semantic-module-set-mo">
          <ChipsFilter
            chips={MOCK_CHIPS}
            selectedIndices={[CHIP_INDEX_BY_MODE[mode]]}
            onChange={handleChipChange}
          />

          <ul className="flex flex-col gap-12">
            {currentReviews.map((review) => (
              <li key={review.id}>
                <OrderSection
                  state={review.state}
                  rating={review.rating}
                  deadline={review.deadline}
                  pointsLabel={review.pointsLabel}
                  onRatingClick={() => handleRatingClick(review.id)}
                  review={{
                    kind: review.kind,
                    productName: review.productName,
                    image: review.image,
                    delivery: review.delivery,
                    date: review.date,
                    // all-case + delivery/date 없음 = 단일 라인 카드.
                    // Module.tsx default(items-start) 를 items-center 로 override.
                    // delivery/date 있는 다줄 카드는 default(items-start) 사용.
                    className:
                      review.kind === "all-case" &&
                      !review.delivery &&
                      !review.date
                        ? "items-center!"
                        : undefined,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ActionArea
        label="더보기"
        buttonVariant="tertiary"
        trailingIcon="chevron-down"
      />
    </main>
  );
}
