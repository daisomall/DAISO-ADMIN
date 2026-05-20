"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TopNavigation } from "@/app/components/layout/TopNavigation";
import { TabGroup } from "@/app/components/ui/Tab";
import { ChipsFilter } from "@/app/components/ui/Chip";
import { OrderSection } from "@/app/components/module";
import { ActionArea } from "@/app/components/ui/ActionArea";
import { Icon } from "@/app/components/ui/Icon";

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
 * 초기 노출 카드 수 (Figma UX_07_086 = 4개).
 * 이 수까지만 먼저 렌더, 이후는 "더보기" 클릭 시 PAGE_SIZE 만큼 append.
 */
const INITIAL_VISIBLE_COUNT = 4;

/**
 * "더보기" 1회 클릭당 추가 로드(append) 개수.
 * 실제 서비스에서는 API page size 와 일치시킴.
 */
const PAGE_SIZE = 4;

/** mock 네트워크 지연 (ms) — 로딩 상태/중복클릭 방지 동작 시연용. */
const MOCK_LOAD_DELAY_MS = 400;

/**
 * 모드별 리뷰 리스트 (전체 — initial + additional 합본).
 * - store : Figma UX_07_086_매장   — store icon placeholder (kind=store-only)
 * - daiso : Figma UX_07_086_다이소몰 — image + 택배 badge + 입고일 (kind=all-case)
 *
 * 앞 INITIAL_VISIBLE_COUNT 개 = 초기 노출, 나머지 = "더보기" expand 대상.
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
    // ─── 이하 "더보기" expand 대상 (additional) ───
    {
      id: "store-r5",
      productName: "참바른 약산성 클렌징 폼 150ml",
      rating: 0,
      deadline: DEADLINE_D24,
      state: "default",
      kind: "store-only",
    },
    {
      id: "store-r6",
      productName: "데일리 수분 진정 크림 50ml",
      rating: 0,
      deadline: DEADLINE_D24,
      state: "default",
      kind: "store-only",
    },
    {
      id: "store-r7",
      productName: "마일드 톤업 선스틱 SPF50+",
      rating: 3,
      deadline: DEADLINE_D24,
      state: "default",
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
    // ─── 이하 "더보기" expand 대상 (additional) ───
    {
      id: "daiso-r5",
      productName: "올데이 모이스처 핸드크림 30ml",
      rating: 0,
      deadline: DEADLINE_D24,
      state: "default",
      kind: "all-case",
      delivery: "normal",
      date: "2025-07-18",
      image: (
        <Image
          src="/dummy-product.png"
          alt=""
          width={52}
          height={52}
          className="size-full object-cover"
        />
      ),
    },
    {
      id: "daiso-r6",
      productName: "쿨링 수분 미스트 100ml",
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
      id: "daiso-r7",
      productName: "데일리 수분팩 50매",
      rating: 4,
      deadline: DEADLINE_D24,
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

  /**
   * 현재까지 노출(append)된 카드 수. 초기 INITIAL_VISIBLE_COUNT,
   * "더보기" 1회당 PAGE_SIZE 만큼 누적 증가. (toggle 아님 — 단방향 append)
   */
  const [visibleCount, setVisibleCount] = React.useState(
    INITIAL_VISIBLE_COUNT,
  );

  /**
   * enter 애니메이션이 완료(시작)된 카드 수.
   * - visibleCount 와 분리된 별도 상태 — append(데이터 렌더) 와
   *   enter 애니메이션 트리거를 독립적으로 제어하기 위함.
   * - i < enteredCount 인 카드만 "보임(opacity-100, translate-0)" 상태.
   * - 신규 append 카드는 먼저 hidden 으로 렌더된 뒤, 다음 paint(rAF)에서
   *   enteredCount 가 올라가며 transition 발생.
   * - 초기 카드(0..INITIAL_VISIBLE_COUNT)는 처음부터 entered (애니메이션 X).
   */
  const [enteredCount, setEnteredCount] = React.useState(
    INITIAL_VISIBLE_COUNT,
  );

  /**
   * 중복 클릭 방지용 **silent lock** (useRef — 리렌더 미유발).
   * - state 가 아니므로 버튼은 시각적으로 항상 동일 (loading/disabled UI 없음).
   * - fetch in-flight 동안 true → 재진입(중복 fetch) 차단, UI 변화 0.
   * - production 의 "요청 중복 방지 플래그" 와 동일 역할.
   */
  const loadingLockRef = React.useRef(false);

  /**
   * 진행 중 mock 로드 타이머 + enter 애니메이션 rAF.
   * 모드 전환 / unmount 시 둘 다 취소하여 stale 상태 업데이트 방지
   * (production 의 AbortController + cancelAnimationFrame 대응).
   */
  const loadTimerRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number | null>(null);

  const clearPendingLoad = React.useCallback(() => {
    if (loadTimerRef.current !== null) {
      window.clearTimeout(loadTimerRef.current);
      loadTimerRef.current = null;
    }
    if (rafRef.current !== null) {
      window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  // unmount 시 진행 중 타이머 정리.
  React.useEffect(() => clearPendingLoad, [clearPendingLoad]);

  const currentReviews = MOCK_REVIEWS[mode];
  const visibleReviews = currentReviews.slice(0, visibleCount);

  /**
   * 더보기 버튼 노출 조건 — 아직 노출 안 한 잔여 데이터가 있을 때만.
   * 잔여 없으면 버튼 자체를 미렌더 (클릭 가능 상태 원천 차단).
   * 실제 서비스에서는 `hasNextPage` API flag 로 대체.
   */
  const hasMore = visibleCount < currentReviews.length;

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
   * - 모드 변경 시 expand 초기화 (새 리스트는 더보기 collapsed 상태로).
   */
  const handleChipChange = (indices: number[]) => {
    if (indices.length === 0) return;
    const idx = indices[0];
    const next: ReviewMode | undefined = (
      Object.entries(CHIP_INDEX_BY_MODE) as [ReviewMode, number][]
    ).find(([, i]) => i === idx)?.[0];
    if (next) {
      // 모드 변경 → 진행 중 로드/애니메이션 취소 + pagination 초기화.
      // enteredCount 도 초기값으로 → 새 리스트 첫 페이지는 애니메이션 없이 즉시 표시.
      // lock 해제 — 취소된 타이머의 unlock 콜백이 안 돌므로 수동 reset.
      clearPendingLoad();
      loadingLockRef.current = false;
      setMode(next);
      setVisibleCount(INITIAL_VISIBLE_COUNT);
      setEnteredCount(INITIAL_VISIBLE_COUNT);
    }
  };

  /**
   * "더보기" — 다음 페이지 fetch → append → 신규 카드 enter 애니메이션.
   *
   * 버튼 상태 UI 절대 변경 없음:
   *  - 중복 클릭 방지는 `loadingLockRef` (useRef) 로만 처리 → 리렌더/버튼
   *    disabled/spinner 없음. 사용자에게 보이는 건 "리스트 확장 결과"뿐.
   *
   * 흐름:
   *  1) lock 획득 (silent — UI 변화 0). 이미 lock 이면 무시(중복 차단).
   *  2) fetch (mock 지연 — 실제 API latency 대응. 버튼은 그대로 노출 유지)
   *  3) setVisibleCount → 신규 카드 append (hidden 으로 렌더) + lock 해제
   *  4) double rAF → 신규 카드 paint 후 enteredCount 상승 → CSS transition
   *     으로 자연스럽게 "아래 상품 추가" 결과만 노출
   *
   * 기존 카드는 안정 key(review.id) 로 재마운트 없음 → 스크롤 위치 보존.
   * production: setTimeout → await api.fetch (lock 으로 in-flight 중복 차단),
   *             AbortController + cancelAnimationFrame 동일 패턴.
   */
  const handleLoadMore = () => {
    // 1) silent lock — state 아님, 버튼 UI 불변. 재진입 차단.
    if (loadingLockRef.current || !hasMore) return;
    loadingLockRef.current = true;

    loadTimerRef.current = window.setTimeout(() => {
      // 2)→3) fetch 완료 → append + lock 해제 (UI 상에 loading 단계 없음)
      const nextCount = Math.min(
        visibleCount + PAGE_SIZE,
        currentReviews.length,
      );
      setVisibleCount(nextCount);
      loadingLockRef.current = false;
      loadTimerRef.current = null;

      // 4) 신규 카드 hidden paint 후 다음 frame 에 enter 트리거.
      //    double rAF — React commit + 브라우저 초기 paint 보장 후 transition.
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = window.requestAnimationFrame(() => {
          setEnteredCount(nextCount);
          rafRef.current = null;
        });
      });
    }, MOCK_LOAD_DELAY_MS);
  };

  /** OrderSection 렌더 helper — initial / additional 리스트 공통 사용. */
  const renderReviewCard = (review: ReviewItem) => (
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
        className:
          review.kind === "all-case" &&
          !review.delivery &&
          !review.date
            ? "items-center!"
            : undefined,
      }}
    />
  );

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

          {/* 카드 리스트 — visibleCount 까지 단방향 누적(append) 렌더.
              key=review.id 안정 → 기존 카드 재마운트 없음 → 스크롤 보존.

              per-item enter 애니메이션:
              - i < enteredCount  → 보임 (opacity-100 / translate-y-0)
              - i >= enteredCount → 신규 append 카드, 초기 hidden
                (opacity-0 / translate-y-8) → 다음 paint 에서 enteredCount
                상승 시 transition 으로 자연 enter.
              transform/opacity 는 layout 에 영향 없음 (gap-12 유지, shift 0).
              초기 카드는 enteredCount 초기값으로 처음부터 보임 (애니메이션 X). */}
          <ul className="flex flex-col gap-12">
            {visibleReviews.map((review, i) => (
              <li
                key={review.id}
                className={[
                  "transition duration-300 ease-out",
                  i < enteredCount
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8",
                ].join(" ")}
              >
                {renderReviewCard(review)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 더보기 — 잔여 데이터 있을 때만 렌더 (없으면 버튼 미존재 → 클릭 불가).
          버튼은 항상 동일 시각 상태 (loading/disabled/spinner UI 없음).
          중복 클릭은 handleLoadMore 내부 loadingLockRef 로만 silent 차단.
          잔여 소진 시 hasMore=false → 버튼 즉시 hidden (상태 노출 없이 결과만). */}
      {hasMore && (
        <ActionArea
          label="더보기"
          buttonVariant="tertiary"
          trailingIcon="chevron-down"
          onClick={handleLoadMore}
        />
      )}
    </main>
  );
}
