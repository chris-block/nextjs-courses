import HeroSection from '@/components/homepage/hero-section'
import MarketingCards from '@/components/homepage/marketing-cards'
import PageWrapper from "@/components/wrapper/page-wrapper"

export default function HomePage() {
  return (
    <PageWrapper>
      <main>
        <HeroSection />
        <MarketingCards />
      </main>
    </PageWrapper>
  )
}
