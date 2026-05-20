"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { TopNavigation } from "@/app/components/layout/TopNavigation";

import {
  Accordion,
  AccordionBulletList,
  ActionArea,
  Button,
  Divider,
  Dropdown,
  Icon,
  Popover,
  TextInput,
} from "@/app/components/ui";

import { ReviewCard } from "@/app/components/module/ReviewCard";

import type { DropdownOption } from "@/app/components/ui/Dropdown";

// ──────────────────────────────────────────────────────────────
// Mock Data
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

const MOCK_STAR_LABELS: Record<number, string> = {
  1: "별로예요",
  2: "그저그래요",
  3: "괜찮아요",
  4: "무난해요",
  5: "만족해요",
};

type RatingOptionItem = {
  value: string;
  label: string;
};

const MOCK_DESIGN_OPTIONS: RatingOptionItem[] = [
  { value: "dislike", label: "마음에 들지\n않아요" },
  { value: "normal", label: "보통이에요" },
  { value: "like", label: "아주 마음에\n들어요" },
];

const MOCK_USABILITY_OPTIONS: RatingOptionItem[] = [
  { value: "hard", label: "불편해요" },
  { value: "normal", label: "보통이에요" },
  { value: "easy", label: "편리해요" },
];

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

const MOCK_ACCORDION_ITEMS: React.ReactNode[] = [
  "제목에 대한 상세 내용을 입력해주세요.\n긴 컨텐츠라면 접은 상태를 기본값으로 사용하세요.",
  "항목에 대한 하위 텍스트는 텍스트 박스 아래에 작성합니다.",
  "식품 등의 표시·광고에 관한 법률에 의거하여 당사 심의 기준을 준수한 리뷰만 제공됩니다.",
  "개인정보 유출 및 권리 침해 기준 및 유의 사항 안내",
  "상기 내용을 게시할 경우, 임의로 삭제 및 경고 처리할 수 있습니다.",
];

// ──────────────────────────────────────────────────────────────
// Local Components
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
      <div className="flex items-center gap-4">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = value >= star;

          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
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

const PICKER_OPTION_SIZE =
  "calc(var(--spacing-scale-32) + var(--spacing-scale-8))";

function OptionPicker3({
  value,
  options,
  onChange,
}: {
  value: string | null;
  options: RatingOptionItem[];
  onChange: (next: string) => void;
}) {
  return (
    <div className="relative flex w-full items-start">
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

        return (
          <div
            key={opt.value}
            className="flex min-w-0 flex-1 flex-col items-center gap-8"
          >
            <button
              type="button"
              onClick={() => onChange(opt.value)}
              style={{
                width: PICKER_OPTION_SIZE,
                height: PICKER_OPTION_SIZE,
              }}
              className={[
                "relative z-10 flex items-center justify-center rounded-pill border bg-semantic-background-base-white",
                selected
                  ? "border-palette-gray-800"
                  : "border-semantic-stroke-basic2",
              ].join(" ")}
            >
              <span
                className={[
                  "size-32 rounded-pill",
                  selected
                    ? "bg-palette-gray-800"
                    : "bg-semantic-stroke-basic2",
                ].join(" ")}
              />
            </button>

            <span
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

function InfoBulletList({
  items,
}: {
  items: React.ReactNode[];
}) {
  return (
    // w-full — Figma Popup/Text 는 335 full-width 좌측정렬.
    // 부모 RatingBoxSection(items-center) 에서 중앙축소 방지.
    <ul className="flex w-full flex-col gap-4 text-semantic-text-secondary">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-8"
        >
          {/* 3×3 dot — Figma `imgDot` vector 1:1. DDS scale 외 크기라
              토큰 비종속 inline SVG. height=caption-1 line-height(16) →
              text 첫 줄과 vertical-center 자동 정렬 (mt 보정 불필요). */}
          <svg
            aria-hidden
            width={3}
            height={16}
            viewBox="0 0 3 16"
            className="shrink-0"
          >
            <circle cx={1.5} cy={8} r={1.5} fill="currentColor" />
          </svg>

          <span className="flex-1 text-caption-1 font-regular">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function RatingBoxSection({
  title,
  pointsLabel,
  children,
}: {
  title: string;
  pointsLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex w-full flex-col items-center gap-16 px-semantic-page-margin py-24">
      <div className="flex items-center gap-8">
        <p className="font-display text-heading-5 font-bold text-semantic-text-primary">
          {title}
        </p>

        {pointsLabel && (
          <Popover position="left">
            <span className="font-promo">
              +{pointsLabel}
            </span>{" "}
            적립
          </Popover>
        )}
      </div>

      {children}
    </section>
  );
}

// ──────────────────────────────────────────────────────────────
// Page
// ──────────────────────────────────────────────────────────────

export default function ReviewWritePage() {
  const router = useRouter();

  const [option, setOption] =
    React.useState<string>();

  const [starRating, setStarRating] =
    React.useState<number>(4);

  const [designChoice, setDesignChoice] =
    React.useState<string | null>("normal");

  const [usabilityChoice, setUsabilityChoice] =
    React.useState<string | null>(null);

  const [reviewText, setReviewText] =
    React.useState("");

  return (
    <main className="flex min-h-screen w-full flex-col bg-semantic-background-base-white">
      <TopNavigation
        title="리뷰"
        onLeadingClick={() => router.back()}
      />

      <section className="flex flex-col gap-12 px-semantic-page-margin pt-12 pb-24">
        <ReviewCard
          kind="all-case"
          image={MOCK_PRODUCT.image}
          productName={MOCK_PRODUCT.name}
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

      <RatingBoxSection
        title="상품에 얼마나 만족하시나요?"
        pointsLabel="1P"
      >
        <StarRatingInput
          value={starRating}
          onChange={setStarRating}
          labelMap={MOCK_STAR_LABELS}
        />
      </RatingBoxSection>

      <div className="px-semantic-page-margin">
        <Divider variant="normal" />
      </div>

      <RatingBoxSection title="디자인은 마음에 드나요?">
        <OptionPicker3
          value={designChoice}
          options={MOCK_DESIGN_OPTIONS}
          onChange={setDesignChoice}
        />
      </RatingBoxSection>

      <div className="px-semantic-page-margin">
        <Divider variant="normal" />
      </div>

      <RatingBoxSection title="사용에 어려움은 없나요?">
        <OptionPicker3
          value={usabilityChoice}
          options={MOCK_USABILITY_OPTIONS}
          onChange={setUsabilityChoice}
        />
      </RatingBoxSection>

      <div className="px-semantic-page-margin">
        <Divider variant="normal" />
      </div>

      <RatingBoxSection
        title="솔직한 리뷰를 남겨주세요."
        pointsLabel="1P"
      >
        <div className="flex w-full flex-col gap-8">
          <TextInput
            placeholder="상품을 사용하며 느낀 장단점 등을 10자 이상 입력해 주세요."
            value={reviewText}
            onChange={(e) =>
              setReviewText(e.target.value)
            }
          />

          <div className="flex gap-8">
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

      <Accordion
        title="리뷰 작성 전 확인해 주세요."
        defaultExpanded
      >
        <AccordionBulletList
          items={MOCK_ACCORDION_ITEMS}
        />
      </Accordion>

      <ActionArea
        label="등록하기"
        buttonVariant="primary"
        onClick={() => {
          router.push("/home");
        }}
      />
    </main>
  );
}
