"use client";

import * as React from "react";

import {
  Accordion,
  AccordionBulletList,
  ActionArea,
  Button,
  ButtonChip,
  Chip,
  ChipsFilter,
  Divider,
  Dropdown,
  Icon,
  Popover,
  Tab,
  TabGroup,
  TextInput,
} from "@/app/components/ui";

import type { IconName } from "@/app/components/ui";

import { FlagReview } from "@/app/components/module/FlagReview";
import { OrderSection } from "@/app/components/module/OrderSection";
import { ReviewCard } from "@/app/components/module/ReviewCard";

import { TopNavigation } from "@/app/components/layout/TopNavigation";

/**
 * DDS Test Page
 *
 * 목적: Tailwind v4 + design token + 실제 UI 조합 검증
 * (컴포넌트 문서가 아님. variant / state 시각 확인용)
 *
 * 등록된 컴포넌트만 노출. 컴포넌트가 추가되면 본 페이지에 섹션 추가.
 */
export default function DDSTestPage() {
  return (
    <main className="min-h-screen bg-semantic-background-grouped p-32">
      <div className="mx-auto max-w-pc">
        <header className="mb-32">
          <h1 className="text-heading-1 font-bold text-semantic-text-primary">
            DDS Test Page
          </h1>
          <p className="mt-8 text-body-4 text-semantic-text-secondary">
            DDS(Daiso Design System) 컴포넌트의 variant · state 시각 검증 페이지.
          </p>
        </header>

        <Section title="Button">
          <Row label="variant=primary, size=large">
            <Button label="텍스트" variant="primary" size="large" />
            <Button label="텍스트" variant="primary" size="large" icon />
            <Button
              label="텍스트"
              variant="primary"
              size="large"
              disabled
            />
            <Button
              label="텍스트"
              variant="primary"
              size="large"
              icon
              disabled
            />
          </Row>

          <Row label="variant=tertiary, size=large">
            <Button label="텍스트" variant="tertiary" size="large" />
            <Button label="텍스트" variant="tertiary" size="large" icon />
            <Button
              label="텍스트"
              variant="tertiary"
              size="large"
              disabled
            />
            <Button
              label="텍스트"
              variant="tertiary"
              size="large"
              icon
              disabled
            />
          </Row>

          <Row label="variant=tertiary, size=medium">
            <Button label="텍스트" variant="tertiary" size="medium" />
            <Button label="텍스트" variant="tertiary" size="medium" icon />
            <Button
              label="텍스트"
              variant="tertiary"
              size="medium"
              disabled
            />
            <Button
              label="텍스트"
              variant="tertiary"
              size="medium"
              icon
              disabled
            />
          </Row>

          <Row label="variant=primary, size=medium">
            <Button label="텍스트" variant="primary" size="medium" />
            <Button label="텍스트" variant="primary" size="medium" icon />
            <Button
              label="텍스트"
              variant="primary"
              size="medium"
              disabled
            />
          </Row>
        </Section>

        <Section title="Module / FlagReview">
          <Row label="type=in-store-purchase (default)">
            <FlagReview type="in-store-purchase" />
            <FlagReview type="repurchase" />
          </Row>
        </Section>

        <Section title="Module / ReviewCard">
          <BlockRow label="kind=all-case (이미지 + 배송 + 날짜 + 옵션)">
            <ReviewCard
              kind="all-case"
              image={
                <img
                  src="/dummy-product.png"
                  alt="더미 상품"
                  className="size-full object-cover"
                />
              }
              delivery="normal"
              date="2025-07-18"
              productName="닥터오라클 큐어소나 쿨링코드 더마쿨러 두줄 일 때 이렇게 노출됨"
              optionText="옵션: 핑크-블루 체리블라썸"
            />
          </BlockRow>

          <BlockRow label="kind=store-only (store icon + 상품 정보만)">
            <ReviewCard
              kind="store-only"
              productName="닥터오라클 큐어소나 쿨링코드 더마쿨러 두줄 일 때 이렇게 노출됨"
            />
          </BlockRow>
        </Section>

        <Section title="Module / OrderSection">
          <BlockRow label="state=default (rating 0, empty stars)">
            <OrderSection
              state="default"
              review={{
                kind: "all-case",
                image: (
                  <img
                    src="/dummy-product.png"
                    alt="더미 상품"
                    className="size-full object-cover"
                  />
                ),
                delivery: "normal",
                date: "2025-07-18",
                productName: "닥터오라클 큐어소나 쿨링코드 더마쿨러",
                optionText: "옵션: 핑크-블루 체리블라썸",
              }}
              rating={0}
              deadline="2025-07-04 (D-24)"
            />
          </BlockRow>

          <BlockRow label="state=in-progress (rating 5, popover 24P, continue chip)">
            <OrderSection
              state="in-progress"
              review={{
                kind: "store-only",
                productName: "닥터오라클 큐어소나 쿨링코드 더마쿨러",
              }}
              rating={5}
              deadline="2025-07-04 (D-24)"
              pointsLabel="24P"
              onContinue={() => {
                /* test page: do nothing */
              }}
            />
          </BlockRow>
        </Section>

        <Section title="Top Navigation">
          <BlockRow label="default">
            <TopNavigation title="페이지 제목" />
          </BlockRow>
        </Section>

        <Section title="Popover">
          <Row label="position=bottom (화살표 ↓)">
            <Popover position="bottom">
              텍스트 <span className="font-promo">25P</span> 텍스트
            </Popover>
          </Row>

          <Row label="position=left (화살표 ←)">
            <Popover position="left">
              텍스트 <span className="font-promo">25P</span> 텍스트
            </Popover>
          </Row>

          <Row label="text only (Daiso 강조 없음)">
            <Popover position="bottom">간단한 안내</Popover>
          </Row>

          <Row label="icon + text composition">
            <Popover position="bottom">
              <Icon name="tooltip" size={14} />
              <span>도움말</span>
            </Popover>
          </Row>

          <p className="mt-8 text-caption-2 text-semantic-text-secondary">
            * Positioning(target 옆에 띄우기)은 consumer 책임. Popover 컴포넌트는
            styled bubble + arrow 만 제공. 실사용 시 wrapper 의 absolute /
            Floating UI 등으로 target 에 anchor.
          </p>
        </Section>

        <Section title="Dropdown">
          <BlockRow label="state=default (placeholder)">
            <Dropdown
              placeholder="선택해주세요"
              options={[
                { value: "1", label: "텍스트 옵션 1" },
                { value: "2", label: "텍스트 옵션 2" },
                { value: "3", label: "텍스트 옵션 3" },
                { value: "4", label: "텍스트 옵션 4" },
                { value: "5", label: "텍스트 옵션 5" },
              ]}
            />
          </BlockRow>

          <BlockRow label="defaultValue 선택됨 (더미 이미지 · hover · 품절 케이스 포함)">
            <Dropdown
              defaultValue="product-1"
              options={[
                {
                  value: "product-1",
                  label: "닥터오라클 큐어소나 쿨링코드 더마쿨러",
                  image: (
                    <img
                      src="/dummy-product.png"
                      alt=""
                      className="size-24 shrink-0 object-cover"
                    />
                  ),
                },
                {
                  value: "product-2",
                  label: "다이소 비누 묶음 6입",
                  image: (
                    <img
                      src="/dummy-product.png"
                      alt=""
                      className="size-24 shrink-0 object-cover"
                    />
                  ),
                },
                {
                  value: "product-3",
                  label: "다이소 칫솔 (품절)",
                  image: (
                    <img
                      src="/dummy-product.png"
                      alt=""
                      className="size-24 shrink-0 object-cover"
                    />
                  ),
                  disabled: true,
                },
                {
                  value: "product-4",
                  label: "샴푸 1L",
                  image: (
                    <img
                      src="/dummy-product.png"
                      alt=""
                      className="size-24 shrink-0 object-cover"
                    />
                  ),
                },
              ]}
            />
            <p className="mt-8 text-caption-2 text-semantic-text-secondary">
              * 트리거 : 선택된 상품(product-1) 의 이미지(24×24) 노출
              <br />
              * 활성 옵션 hover → bg-palette-gray-200 highlight (트리거 클릭 후
              마우스 오버로 확인)
              <br />
              * 품절 옵션 (product-3, disabled=true) → bg-semantic-background-disabled
              + text-semantic-text-disable + cursor-not-allowed
            </p>
          </BlockRow>

          <BlockRow label="disabled option 포함">
            <Dropdown
              placeholder="선택해주세요"
              options={[
                { value: "a", label: "활성 옵션 A" },
                { value: "b", label: "비활성 옵션 B", disabled: true },
                { value: "c", label: "활성 옵션 C" },
              ]}
            />
          </BlockRow>

          <BlockRow label="전체 disabled">
            <Dropdown
              placeholder="선택해주세요"
              disabled
              options={[
                { value: "1", label: "옵션 1" },
                { value: "2", label: "옵션 2" },
              ]}
            />
          </BlockRow>
          <p className="mt-8 text-caption-2 text-semantic-text-secondary">
            * 트리거 클릭 시 옵션 패널 토글, 외부 클릭 시 자동 닫힘. 옵션 hover
            시 bg-palette-gray-200.
          </p>
        </Section>

        <Section title="Accordion">
          <BlockRow label="defaultExpanded=false (closed)">
            <Accordion title="리뷰 작성 전 확인해 주세요.">
              <AccordionBulletList
                items={[
                  "제목에 대한 상세 내용을 입력해주세요.",
                  "항목에 대한 하위 텍스트는 텍스트 박스 아래에 작성합니다.",
                ]}
              />
            </Accordion>
          </BlockRow>

          <BlockRow label="defaultExpanded=true (Figma bullet list 패턴)">
            <Accordion title="리뷰 작성 전 확인해 주세요." defaultExpanded>
              <AccordionBulletList
                items={[
                  <>
                    제목에 대한 상세 내용을 입력해주세요.
                    <br />긴 컨텐츠라면 접은 상태를 기본값으로 사용하세요.
                  </>,
                  "항목에 대한 하위 텍스트는 텍스트 박스 아래에 작성합니다.",
                  <>
                    식품 등의 표시·광고에 관한 법률에 의거하여 당사 심의 기준을
                    준수한 리뷰만 제공됩니다. 식품 표시 광고법에 위배되는 내용은
                    블라인드 처리할 수 있습니다.
                    <br />- 질병 예방/치료 효과가 있다는 내용
                    <br />- 의약외품을 의약품으로 오인하게 하는 내용
                    <br />- 과학적 근거 없이 효능을 과장하는 내용
                  </>,
                  <>
                    개인정보 유출 및 권리 침해 기준 및 유의 사항 안내
                    <br />① 개인정보(연락처, 주소, 카드번호 등) 유출
                    <br />② 모욕적인 발언(성적 발언, 인신 공격, 과도한 비판 등)
                    <br />③ 이외 상대방이 불쾌할 수 있는 내용
                  </>,
                  "상기 내용을 게시할 경우, 임의로 삭제 및 경고 처리할 수 있습니다.",
                ]}
              />
            </Accordion>
          </BlockRow>

          <BlockRow label="multiple stacked (각각 독립 toggle)">
            <div className="flex flex-col gap-8">
              <Accordion title="첫 번째 섹션">
                <AccordionBulletList items={["내용 1", "내용 2"]} />
              </Accordion>
              <Accordion title="두 번째 섹션">
                <AccordionBulletList items={["내용 A", "내용 B"]} />
              </Accordion>
              <Accordion title="세 번째 섹션">
                <AccordionBulletList items={["내용 X"]} />
              </Accordion>
            </div>
          </BlockRow>

          <BlockRow label="disabled (토글 비활성화)">
            <Accordion title="비활성 상태 — 토글 안 됨" disabled />
          </BlockRow>

          <BlockRow label="children = 임의 ReactNode (bullet list 아닌 form 등)">
            <Accordion title="설정 변경" defaultExpanded>
              <div className="flex flex-col gap-12">
                <p className="text-body-6 font-regular text-semantic-text-primary">
                  detail panel 은 children 으로 임의 컴포넌트 배치 가능.
                </p>
                <Button label="저장" size="medium" variant="primary" />
              </div>
            </Accordion>
          </BlockRow>
        </Section>

        <Section title="Chip + ChipsFilter">
          <Row label="standalone Chip — selected / unselected / disabled">
            <Chip label="Selected" selected />
            <Chip label="Unselected" />
            <Chip label="Disabled" disabled />
            <Chip label="Disabled selected" selected disabled />
          </Row>

          <BlockRow label="ChipsFilter — single mode (default, toggle 가능)">
            <ChipsFilter
              chips={[
                { label: "다이소몰 구매 8" },
                { label: "매장 구매 4" },
              ]}
              defaultSelectedIndices={[1]}
            />
          </BlockRow>

          <BlockRow label="ChipsFilter — multiple mode (다중 선택)">
            <ChipsFilter
              chips={[
                { label: "신선식품" },
                { label: "생활용품" },
                { label: "뷰티" },
                { label: "패션" },
                { label: "가전" },
              ]}
              multiple
              defaultSelectedIndices={[0, 2]}
            />
          </BlockRow>

          <BlockRow label="ChipsFilter — disabled chip 포함">
            <ChipsFilter
              chips={[
                { label: "활성" },
                { label: "비활성", disabled: true },
                { label: "활성2" },
              ]}
              defaultSelectedIndices={[0]}
            />
          </BlockRow>
        </Section>

        <Section title="Tab + TabGroup">
          <BlockRow label="TabGroup — 2 tabs with counts (12 / 99+)">
            <TabGroup
              defaultSelectedIndex={0}
              tabs={[
                { label: "Lable", count: 12 },
                { label: "Lable", count: "99+" },
              ]}
            />
          </BlockRow>

          <BlockRow label="TabGroup — 3 tabs, no counts">
            <TabGroup
              defaultSelectedIndex={1}
              tabs={[
                { label: "탭1" },
                { label: "탭2" },
                { label: "탭3" },
              ]}
            />
          </BlockRow>

          <BlockRow label="TabGroup — disabled tab 포함">
            <TabGroup
              defaultSelectedIndex={0}
              tabs={[
                { label: "활성", count: 5 },
                { label: "비활성", disabled: true },
                { label: "활성2" },
              ]}
            />
          </BlockRow>

          <Row label="standalone Tab — selected / unselected">
            <Tab label="Selected" count={12} selected />
            <Tab label="Unselected" count="99+" />
            <Tab label="No count" selected />
            <Tab label="Disabled" count={3} disabled />
          </Row>
        </Section>

        <Section title="TextInput">
          <BlockRow label="state=default (empty, placeholder)">
            <TextInput placeholder="플레이스 홀더" />
          </BlockRow>
          <BlockRow label="state=filled (defaultValue 6글자, focus 시 active border)">
            <TextInput
              placeholder="플레이스 홀더"
              defaultValue="텍스트 입력"
            />
          </BlockRow>
          <BlockRow label="state=error (error 메시지 + red border)">
            <TextInput
              placeholder="플레이스 홀더"
              defaultValue="텍스트 입력"
              error="메시지에 마침표를 찍어요."
            />
          </BlockRow>
          <BlockRow label="state=disabled">
            <TextInput
              placeholder="플레이스 홀더"
              defaultValue="텍스트 입력"
              disabled
            />
          </BlockRow>
          <p className="mt-8 text-caption-2 text-semantic-text-secondary">
            * Active Focus state 는 input 클릭/탭으로 직접 focus 시 visible.
            카운터는 입력 시 실시간 갱신.
          </p>
        </Section>

        <Section title="Icon">
          <Row label="모든 icon (default size)">
            {(
              [
                "blank",
                "star",
                "chevron-down",
                "chevron-up",
                "chevron-right",
                "tooltip",
                "video",
                "camera",
                "store",
                "arrow-left",
                "write",
                "profile",
              ] satisfies IconName[]
            ).map((n) => (
              <IconCell key={n} name={n} />
            ))}
          </Row>

          <Row label="star × size variants (22, 40)">
            <Icon name="star" size={22} className="text-semantic-text-primary" />
            <Icon name="star" size={40} className="text-semantic-text-primary" />
          </Row>

          <Row label="chevron-down × size variants (12, 16, 20)">
            <Icon name="chevron-down" size={12} className="text-semantic-text-primary" />
            <Icon name="chevron-down" size={16} className="text-semantic-text-primary" />
            <Icon name="chevron-down" size={20} className="text-semantic-text-primary" />
          </Row>

          <Row label="chevron-up × size variants (12, 20)">
            <Icon name="chevron-up" size={12} className="text-semantic-text-primary" />
            <Icon name="chevron-up" size={20} className="text-semantic-text-primary" />
          </Row>

          <Row label="color inheritance test (text-semantic-text-* utility)">
            <span className="text-semantic-text-primary">
              <Icon name="star" />
            </span>
            <span className="text-semantic-text-secondary">
              <Icon name="star" />
            </span>
            <span className="text-semantic-text-disable">
              <Icon name="star" />
            </span>
            <span className="text-palette-brand-red">
              <Icon name="star" />
            </span>
          </Row>
        </Section>

        <Section title="Divider">
          <BlockRow label="variant=normal (1px hairline)">
            <Divider variant="normal" />
          </BlockRow>
          <BlockRow label="variant=thick (8px bar)">
            <Divider variant="thick" />
          </BlockRow>
        </Section>

        <Section title="Button / Chip">
          <Row label="variant=default">
            <ButtonChip label="이어서 작성" />
            <ButtonChip label="이어서 작성" icon />
            <ButtonChip label="이어서 작성" disabled />
            <ButtonChip label="이어서 작성" icon disabled />
          </Row>
        </Section>

        <Section title="Action Area">
          <Row label="variant=strong, sticky=false (inline 모드)">
            <ActionArea label="확인" />
          </Row>
          <Row label="+ icon">
            <ActionArea label="확인" icon />
          </Row>
          <Row label="+ disabled">
            <ActionArea label="확인" disabled />
          </Row>
          <Row label="+ icon + disabled">
            <ActionArea label="확인" icon disabled />
          </Row>
          <p className="mt-8 text-caption-2 text-semantic-text-secondary">
            * sticky=true 변형은 뷰포트 하단에 fixed 고정되어 테스트 페이지에서
            다른 컴포넌트와 겹치므로 별도 시연 페이지에서 확인 권장.
          </p>
        </Section>

        {/* 다음 컴포넌트는 빌드되는 대로 아래에 Section 추가 */}
      </div>
    </main>
  );
}

/**
 * Section — 테스트 페이지 내부 group 컨테이너
 * 새 컴포넌트가 아니라 페이지 전용 layout helper.
 */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-32 rounded-medium bg-semantic-background-base-white p-24">
      <h2 className="mb-16 text-heading-3 font-bold text-semantic-text-primary">
        {title}
      </h2>
      <div className="flex flex-col gap-16">{children}</div>
    </section>
  );
}

/**
 * Row — variant label + inline 컴포넌트 인스턴스 배열 (flex)
 */
function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-8 text-caption-1 font-medium text-semantic-text-secondary">
        {label}
      </p>
      <div className="flex flex-wrap items-center gap-12">{children}</div>
    </div>
  );
}

/**
 * BlockRow — variant label + block-level (full-width) 자식 컴포넌트
 * Divider 처럼 자체적으로 full-width 인 컴포넌트용.
 */
function BlockRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-8 text-caption-1 font-medium text-semantic-text-secondary">
        {label}
      </p>
      {children}
    </div>
  );
}

/**
 * IconCell — Icon 미리보기 셀 (이름 라벨 포함)
 */
function IconCell({ name }: { name: IconName }) {
  return (
    <div className="flex flex-col items-center gap-4 text-semantic-text-primary">
      <Icon name={name} />
      <span className="text-caption-3 text-semantic-text-secondary">{name}</span>
    </div>
  );
}
