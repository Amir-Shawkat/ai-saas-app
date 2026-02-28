import Image from "next/image"
import Link from "next/link";

const Cta = () => {
  return (
    <section className="cta-section">
        <div className="cta-badge">Start Kearning your way.</div>
        <h2 className="text-3xl font-bold">Build and Personalize Learning Companion</h2>
        <p className="text-lg">Pick a name, subject, voice & personality - and start learning through voice conversation that fell natural and funny.</p>
        <Image src="images/cta.svg" width={362} height={232} alt="CTA" />
        <button className="btn-primary">
            <Image src="/icons/plus.svg" width={12} height={12} alt="plus" />
            <Link href="/companions/new">
                <p>Build a New Companion</p>
            </Link>
        </button>
    </section>
  )
}

export default Cta  