"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TopNavigation } from "@/app/components/TopNavigation";
import { Divider } from "@/app/components/Divider";
import { Dropdown, type DropdownOption } from "@/app/components/Dropdown";
import { TextInput } from "@/app/components/TextInput";
import { Button } from "@/app/components/Button";
import { Popover } from "@/app/components/Popover";
import { Accordion, AccordionBulletList } from "@/app/components/Accordion";
import { ActionArea } from "@/app/components/ActionArea";
import { Icon } from "@/app/components/Icon";
import { ReviewCard } from "@/app/components/Module";

/**
 * /review/write — 리뷰 작성 페이지 (UX_04_011 mobile frame)
 *
 * Figma reference: 테스트 페이지 › UX_04_011
 *
 * 구조 (Figma 원본 1:1)
 * - TopNavigation "리뷰" (DDS)
 * - Product 섹션:
 *     - ReviewCard (kind=all-case, image + productName 단일 라인)
 *     - Dropdown (옵션 선택)
 * - thick Divider
 * - rating_box × 4 (각 normal Divider 로 구분, 24px padding-y)
 *     1. 별점 — StarRatingInput + label + "+1P 적립" Popover
 *     2. 디자인 만족도 — OptionPicker3
 *     3. 사용 편의성 — OptionPicker3
 *     4. 자유 텍스트 — TextInput + 첨부 Button × 2 + InfoBulletList +
 *        "+1P 적립" Popover
 * - thick Divider
 * - Accordion "리뷰 작성 전 확인해 주세요." (DDS)
 * - ActionArea "등록하기" (primary)
 *
 * Local-only composition (DDS Module.tsx 승격 보류 — 재사용 시점에 승격)
 * - StarRatingInput : interactive 5-star input (40px stars, 라벨 매핑)
 * - OptionPicker3   : 3 원형 옵션 + connector line + 라벨 (survey 패턴)
 * - InfoBulletList  : 작은 dot bullet + Caption 1 (AccordionBulletList 의
 *                     축소 버전 — 다른 size 라 별도 정의)
 *
 * Mock data 와 UI 구조 분리
 * - 상단 const 블록에 MOCK_PRODUCT / MOCK_STAR_LABELS / MOCK_DESIGN_OPTIONS /
 *   MOCK_USABILITY_OPTIONS / MOCK_BULLETS / MOCK_ACCORDION_ITEMS 정의
 *
 * Token 사용 원칙
 * - 색·spacing·radius·typography 모두 globals.css `@theme` 토큰
 * - 신규 hex / 임의 px / inline style 없음.
 *   단, scale 외 값 (40px option) 은 기존 패턴인
 *   `calc(var(--spacing-scale-32) + var(--spacing-scale-8))` 토큰 합성으로 처리.
 *
 * Responsive
 * - 모바일-only 디자인 — full-width flex column. PC layout 정의 없음.
 *
 * /home → 별 영역 클릭 → 본 페이지 라우팅 (router.push('/review/write')).
 */

// ──────────────────────────────────────────────────────────────
// Mock data (UI 구조와 분리)
// ──────────────────────────────────────────────────────────────

const MOCK_PRODUCT: {
  image: React.ReactNode;
  name: string;
  optionPlaceholder: string;
  options: DropdownOption[];
} = {
  image: (
    <Image
      src="/dummy-shoulder-bag.png"
      alt=""
      width={52}
      height={52}
      className="size-full object-cover"
    />
  ),
  name: "여행용 접이식 숄더백 블랙",
  optionPlaceholder: "구매한 옵션을 선택해 주세요.",
  options: [
    { value: "black", label: "블랙" },
    { value: "navy", label: "네이비" },
    { value: "beige", label: "베이지" },
  ],
};

/** 별점 → 한줄평 라벨 매핑 (1~5). */
const MOCK_STAR_LABELS: Record<number, string> = {
  1: "별로예요",
  2: "그저그래요",
  3: "괜찮아요",
  4: "무난해요",
  5: "만족해요",
};

type RatingOptionItem = {
  value: string;
  /**
   * 라벨 텍스트. `\n` 으로 line break 지정 가능 (CSS `whitespace-pre-line`
   * 으로 honor). 디자이너의 의도된 break point 를 데이터로 표현 —
   * JSX `<br />` 대신 content-level 표현으로 분리.
   */
  label: string;
};

const MOCK_DESIGN_OPTIONS: RatingOptionItem[] = [
  // "마음에 들지" + "않아요" — Figma 의도 줄바꿈을 \n 으로 표현
  { value: "dislike", label: "마음에 들지\n않아요" },
  { value: "normal", label: "보통이에요" },
  { value: "like", label: "아주 마음에\n들어요" },
];

const MOCK_USABILITY_OPTIONS: RatingOptionItem[] = [
  { value: "hard", label: "불편해요" },
  { value: "normal", label: "보통이에요" },
  { value: "easy", label: "편리해요" },
];

/**
 * 안내 bullet — Figma 원본:
 * - 1번째 row 는 "사진 첨부 시 +10P, 동영상 첨부 시 +15P 적립" 까지 Bold,
 *   "됩니다." Regular. 나머지 row 는 전부 Regular.
 * - 색상은 모두 text-secondary (gray-500).
 */
const MOCK_BULLETS: React.ReactNode[] = [
  <>
    <span className="font-bold">
      사진 첨부 시 +10P, 동영상 첨부 시 +15P 적립
    </span>
    됩니다.
  </>,
  "첨부 시 최대 +15P 적립",
  "사진 최대 10장, 동영상 최대 1개 첨부 가능합니다.",
  "상품과 무관한 사진/동영상을 첨부한 리뷰는 통보 없이 삭제 및 적립금이 회수됩니다.",
];

/**
 * Accordion 펼침 content — Figma UX_04_011 expanded state 1:1.
 * 7개 row, body-7 Regular text-secondary. multi-line row 는 `\n` 으로
 * sub-line break 표현 (AccordionBulletList 의 whitespace-pre-line 이 honor).
 */
const MOCK_ACCORDION_ITEMS: React.ReactNode[] = [
  "제목에 대한 상세 내용을 입력해주세요.\n긴 컨텐츠라면 접은 상태를 기본값으로 사용하세요.",
  "항목에 대한 하위 텍스트는 텍스트 박스 아래에 작성합니다.",
  "식품 등의 표시·광고에 관한 법률에 의거하여 당사 심의 기준을 준수한 리뷰만 제공됩니다. 식품 표시 광고법에 위배되는 내용은 블라인드 처리할 수 있습니다.\n- 질병 예방/치료 효과가 있다는 내용\n- 의약외품을 의약품으로 오인하게 하는 내용\n- 과학적 근거 없이 효능을 과장하는 내용",
  "개인정보 유출 및 권리 침해 기준 및 유의 사항 안내\n① 개인정보(연락처, 주소, 카드번호, 계좌번호, 주민등록번호 등) 유출\n② 모욕적인 발언(성적 발언, 인신 공격, 과도한 비판 등)\n③ 이외 상대방이 불쾌할 수 있는 내용",
  "상기 내용을 게시할 경우, 임의로 삭제 및 경고 처리할 수 있습니다.",
  "상기 내용을 게시할 경우, 임의로 삭제 및 경고 처리할 수 있습니다.",
  "상기 내용을 게시할 경우, 임의로 삭제 및 경고 처리할 수 있습니다.",
];

// ──────────────────────────────────────────────────────────────
// Local: StarRatingInput
// (interactive 5-star, 40px stars, label 매핑)
//
// A11y
// - container : role="radiogroup" + aria-label
// - 각 star   : role="radio" + aria-checked + aria-label (visible label
//               은 별점 그래픽이므로 텍스트 라벨이 없음 → 직접 aria-label
//               에 의미 부여: "별점 N").
// - subtitle  : 현재 선택값의 한줄평 (e.g. "무난해요"). 정보성 텍스트로
//               aria-live 미적용 (변경 빈도 낮음, 시각으로 즉시 확인).
// ──────────────────────────────────────────────────────────────

function StarRatingInput({
  value,
  onChange,
  labelMap,
}: {
  value: number;
  onChange: (next: number) => void;
  labelMap: Record<number, string>;
}) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div
        role="radiogroup"
        aria-label="별점"
        className="flex items-center gap-4"
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = value >= star;
          return (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={value === star}
              aria-label={`별점 ${star}점`}
              onClick={() => onChange(star)}
              className="cursor-pointer"
            >
              <Icon
                name="star"
                size={40}
                className={
                  filled
                    ? "text-semantic-text-primary"
                    : "text-semantic-stroke-basic2"
                }
              />
            </button>
          );
        })}
      </div>
      {value > 0 && (
        <p className="text-caption-1 font-medium text-semantic-text-primary">
          {labelMap[value]}
        </p>
      )}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Local: OptionPicker3 (RadioGroup pattern)
// (3 원형 옵션 + 연결선 + 라벨, Figma rating_detail_container 기준)
//
// Layout 핵심
//  - container : `relative` + `flex items-start`. items-start → multi-line
//    label 발생해도 circle 의 top-align 기준 유지.
//  - 각 scale item : `flex-1 min-w-0` — 3개 column 균등 분배.
//    min-w-0 로 label content 가 column 폭을 늘리지 못하도록 차단.
//    → 모든 circle 위치가 균등 (1/6, 1/2, 5/6 of container).
//  - connecting line : 단일 `absolute` element. circle 1 center 에서
//    circle 3 center 까지 통합 span. left/right = calc(100%/6) 으로
//    responsive % 위치 (3-column equal distribution 기준).
//    top-20 = circle 반 높이 → circle 수직 center 와 정확 정렬.
//  - circle 의 line cover: button `bg-semantic-background-base-white` +
//    `relative z-10` → 자기 영역(40×40)에서 absolute line 을 덮음.
//    결과: 연결선이 circle 직접 닿아 보이고 (gap 0), circle 내부는
//    line 비노출 → "통합 scale" 시각.
//  - label : `whitespace-pre-line` 으로 mock 의 `\n` honor. column 내 폭
//    제약 없음 (content 자연 폭, column 폭 영향 X).
//
// circle 40px (DDS scale 외) → calc(scale-32 + scale-8) — Profile 54px /
// ReviewCard 52px 와 동일한 structural pattern (design spec width).
//
// A11y (WAI-ARIA radiogroup pattern)
// - container : role="radiogroup" + aria-label (그룹 의미명, prop)
// - 각 button : role="radio" + aria-checked + aria-labelledby={labelId}
// - 각 label  : id={labelId} → button 의 accessible name 으로 연결
// - useId() prefix → 중복 렌더 시 ID collision 방지
// ──────────────────────────────────────────────────────────────

// 40px = DDS scale-32 + scale-8 합성 (circle option design spec 폭).
const PICKER_OPTION_SIZE =
  "calc(var(--spacing-scale-32) + var(--spacing-scale-8))";

function OptionPicker3({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: string | null;
  options: RatingOptionItem[];
  onChange: (next: string) => void;
  ariaLabel: string;
}) {
  if (options.length !== 3) {
    // 본 컴포넌트는 정확히 3 option 전용 — N option 일반화는 별도 promotion 시.
    throw new Error("OptionPicker3 requires exactly 3 options.");
  }

  // label↔button 연결용 unique id prefix. useId() 로 collision 방지.
  const labelIdPrefix = React.useId();

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="relative flex w-full items-start"
    >
      {/* Connecting line — 단일 absolute element.
          3-column equal distribution 기준 circle center 좌표:
            circle 1 = 100% × 1/6,   circle 3 = 100% × 5/6 (= 1/6 from right).
          left/right = calc(100%/6) 으로 양 끝 circle center 에 정확히 anchor.
          top-20 = circle 반 높이 (수직 center).
          circle button 의 bg-white + z-10 가 자기 영역 line 을 자동 cover →
          연결선이 circle 에 바로 닿은 것처럼 보이고 circle 내부는 line 미노출. */}
      <span
        aria-hidden
        className="absolute top-20 h-px bg-semantic-stroke-basic2"
        style={{
          left: "calc(100% / 6)",
          right: "calc(100% / 6)",
        }}
      />

      {options.map((opt) => {
        const selected = value === opt.value;
        const labelId = `${labelIdPrefix}-${opt.value}`;
        return (
          <div
            key={opt.value}
            // flex-1 + min-w-0 → 3 column equal-width distribution.
            // label content 가 column 폭을 늘리지 못하도록 min-w-0 필수.
            className="flex min-w-0 flex-1 flex-col items-center gap-8"
          >
            <button
              type="button"
              role="radio"
              aria-checked={selected}
              aria-labelledby={labelId}
              onClick={() => onChange(opt.value)}
              style={{
                width: PICKER_OPTION_SIZE,
                height: PICKER_OPTION_SIZE,
              }}
              className={[
                // bg-white + relative z-10 → 자기 영역에서 absolute 배경선 cover.
                // 결과: 연결선이 circle 외부에만 보임 (circle ↔ line gap 0).
                "relative z-10 flex shrink-0 cursor-pointer items-center justify-center rounded-pill border bg-semantic-background-base-white",
                selected
                  ? "border-palette-gray-800"
                  : "border-semantic-stroke-basic2",
              ].join(" ")}
            >
              <span
                aria-hidden
                className={[
                  "size-32 rounded-pill",
                  selected
                    ? "bg-palette-gray-800"
                    : "bg-semantic-stroke-basic2",
                ].join(" ")}
              />
            </button>
            {/* Label — id 부여 후 button 의 aria-labelledby 로 연결.
                whitespace-pre-line 으로 데이터의 `\n` honor.
                column 폭 영향 없음 (min-w-0 column 안에서 자연 폭, 필요 시 wrap). */}
            <span
              id={labelId}
              className={[
                "text-center text-caption-1 font-medium whitespace-pre-line",
                selected
                  ? "text-semantic-text-primary"
                  : "text-semantic-text-disable",
              ].join(" ")}
            >
              {opt.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Local: InfoBulletList
// (Caption 1 medium + 3×3 dot bullet — Figma `imgDot` 1:1 vector 구현)
//
// Bullet 구현 디테일 (Figma 1:1)
// - 3×3 px circle vector — list-disc 기본 스타일 대신 inline SVG.
// - SVG height = caption-1 line-height (16) → row 내 자연 alignment.
// - cy = 8 (line-height 의 수직 center) → text first-line center 와 정렬.
// - color: currentColor 상속 (li 의 text-secondary 가 SVG + text 양쪽 적용).
//
// Hanging indent — `flex items-start` + bullet `shrink-0` + text `flex-1`:
//   bullet 은 좌측 고정 폭, text 가 wrap 시 두 번째 라인 부터 text x-position
//   에 정렬 (bullet 좌측 인덴트로 떨어지지 않음).
// ──────────────────────────────────────────────────────────────

/** 3×3 dot bullet — line-height N 짜리 SVG container 내 vertical-center 정렬. */
function BulletDot({ lineHeight }: { lineHeight: number }) {
  return (
    <svg
      aria-hidden
      width={3}
      height={lineHeight}
      viewBox={`0 0 3 ${lineHeight}`}
      className="shrink-0"
    >
      <circle cx={1.5} cy={lineHeight / 2} r={1.5} fill="currentColor" />
    </svg>
  );
}

function InfoBulletList({ items }: { items: React.ReactNode[] }) {
  return (
    // li 에 text-secondary 부여 → bullet SVG + text span 모두 secondary 상속.
    <ul className="flex flex-col text-semantic-text-secondary">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-8">
          <BulletDot lineHeight={16} />
          <span className="flex-1 text-caption-1 font-regular">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ──────────────────────────────────────────────────────────────
// Local: RatingBoxSection
// (각 rating section 공통 wrapper — title + Popover + content)
// ──────────────────────────────────────────────────────────────

function RatingBoxSection({
  title,
  pointsLabel,
  children,
}: {
  title: string;
  /**
   * Popover "+{pointsLabel} 적립" — 미지정 시 popover 숨김.
   * Popover position="left" — 본 컴포넌트의 popover 는 title 우측에 배치되며
   * arrow 가 bubble 의 좌측(title 방향)을 가리키므로 position="left"
   * (DDS 명명: arrow on bubble's left = target on left).
   */
  pointsLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col items-center gap-semantic-title-bottom-mo px-semantic-page-margin py-24">
      <div className="flex w-full items-center justify-center gap-8">
        {/* Heading 5 Bold (SUITE) — `font-display` 명시 필수.
            Tailwind v4 의 `--text-*--font-family` modifier 는 text-*
            utility 에 auto-apply 되지 않음 → family 별도 부여. */}
        <p className="font-display text-heading-5 font-bold text-semantic-text-primary">
          {title}
        </p>
        {pointsLabel && (
          <Popover position="left">
            <span className="font-promo">+{pointsLabel}</span> 적립
          </Popover>
        )}
      </div>
      {children}
    </section>
  );
}

// ──────────────────────────────────────────────────────────────
// /review/write page
// ──────────────────────────────────────────────────────────────

export default function ReviewWritePage() {
  const router = useRouter();

  const [option, setOption] = React.useState<string | undefined>(undefined);
  const [starRating, setStarRating] = React.useState<number>(4);
  const [designChoice, setDesignChoice] = React.useState<string | null>(
    "normal",
  );
  const [usabilityChoice, setUsabilityChoice] = React.useState<string | null>(
    null,
  );
  const [reviewText, setReviewText] = React.useState<string>("");

  return (
    <main className="flex min-h-screen w-full flex-col bg-semantic-background-base-white">
      <TopNavigation
        title="리뷰"
        onLeadingClick={() => router.back()}
      />

      {/* Product 섹션 — 작은 상품카드 + 옵션 Dropdown
          Figma: px-semantic-page-margin / pt-12 / pb-24 / gap-12 */}
      <section className="flex w-full flex-col gap-12 px-semantic-page-margin pt-12 pb-24">
        <ReviewCard
          kind="all-case"
          image={MOCK_PRODUCT.image}
          productName={MOCK_PRODUCT.name}
          // all-case 단일 라인 카드 — items-start default 를 items-center 로 override
          className="items-center!"
        />
        <Dropdown
          options={MOCK_PRODUCT.options}
          value={option}
          onChange={setOption}
          placeholder={MOCK_PRODUCT.optionPlaceholder}
        />
      </section>

      <Divider variant="thick" />

      {/* rating_box 1 — 별점 */}
      <RatingBoxSection title="상품에 얼마나 만족하시나요?" pointsLabel="1P">
        <StarRatingInput
          value={starRating}
          onChange={setStarRating}
          labelMap={MOCK_STAR_LABELS}
        />
      </RatingBoxSection>

      <div className="px-semantic-page-margin">
        <Divider variant="normal" />
      </div>

      {/* rating_box 2 — 디자인 만족도 */}
      <RatingBoxSection title="디자인은 마음에 드나요?">
        <OptionPicker3
          value={designChoice}
          options={MOCK_DESIGN_OPTIONS}
          onChange={setDesignChoice}
          ariaLabel="디자인 만족도"
        />
      </RatingBoxSection>

      <div className="px-semantic-page-margin">
        <Divider variant="normal" />
      </div>

      {/* rating_box 3 — 사용 편의성 */}
      <RatingBoxSection title="사용에 어려움은 없나요?">
        <OptionPicker3
          value={usabilityChoice}
          options={MOCK_USABILITY_OPTIONS}
          onChange={setUsabilityChoice}
          ariaLabel="사용 편의성"
        />
      </RatingBoxSection>

      <div className="px-semantic-page-margin">
        <Divider variant="normal" />
      </div>

      {/* rating_box 4 — 자유 텍스트 + 첨부 + 안내
          Figma 구조 (RatingBoxSection 의 gap-16 으로 분리됨):
          - TextField (TextInput + 첨부 buttons, inner gap-8)
          - InfoBulletList (Popup/Text) — 이전 element 와 outer gap-16 */}
      <RatingBoxSection title="솔직한 리뷰를 남겨주세요." pointsLabel="1P">
        <div className="flex w-full flex-col gap-8">
          <TextInput
            placeholder="상품을 사용하며 느낀 장단점 등을 10자 이상 입력해 주세요."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          {/* 사진/동영상 첨부 — Button(tertiary, medium, leadingIcon) × 2
              equal width split. Figma: gap-8, 50% width each. */}
          <div className="flex w-full items-center gap-8">
            <Button
              label="사진 첨부 (0/10)"
              variant="tertiary"
              size="medium"
              leadingIcon="camera"
              className="flex-1"
            />
            <Button
              label="동영상 첨부 (0/1)"
              variant="tertiary"
              size="medium"
              leadingIcon="video"
              className="flex-1"
            />
          </div>
        </div>
        <InfoBulletList items={MOCK_BULLETS} />
      </RatingBoxSection>

      <Divider variant="thick" />

      {/* Accordion — Figma 최신 frame 이 expanded 상태이므로 defaultExpanded=true.
          content: AccordionBulletList (DDS helper) + MOCK_ACCORDION_ITEMS (7행). */}
      <Accordion
        title="리뷰 작성 전 확인해 주세요."
        defaultExpanded
      >
        <AccordionBulletList items={MOCK_ACCORDION_ITEMS} />
      </Accordion>

      <ActionArea
        label="등록하기"
        buttonVariant="primary"
        onClick={() => {
          // submit handler — 추후 API 연결 시 reviewText / starRating /
          // designChoice / usabilityChoice / option 등 collect 후 POST.
          // 현재는 mock — 클릭 시 /home 으로 복귀.
          router.push("/home");
        }}
      />
    </main>
  );
}
