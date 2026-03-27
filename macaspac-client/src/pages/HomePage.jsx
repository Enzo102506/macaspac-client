import Hero from '../components/Hero'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import Section from '../components/Section'
import LinkCard from '../components/LinkCard'

const documentationLinks = [
  { href: 'https://vite.dev/', label: 'Explore Vite', icon: viteLogo },
  { href: 'https://react.dev/', label: 'Learn more', icon: reactLogo }
]

const socialLinks = [
  { href: 'https://github.com/vitejs/vite', label: 'GitHub', icon: '/icons.svg#github-icon' },
  { href: 'https://chat.vite.dev/', label: 'Discord', icon: '/icons.svg#discord-icon' },
  { href: 'https://x.com/vite_js', label: 'X.com', icon: '/icons.svg#x-icon' },
  { href: 'https://bsky.app/profile/vite.dev', label: 'Bluesky', icon: '/icons.svg#bluesky-icon' }
]

export default function HomePage() {
  return (
    <>
      <Hero heroImg={heroImg} reactLogo={reactLogo} viteLogo={viteLogo} />
      
      <div className="ticks"></div>

      <section id="next-steps">
        <Section 
          id="docs" 
          icon="/icons.svg#documentation-icon" 
          title="Documentation" 
          description="Your questions, answered"
        >
          {documentationLinks.map((link, idx) => (
            <LinkCard 
              key={idx}
              href={link.href} 
              label={link.label} 
              icon={link.icon}
            />
          ))}
        </Section>

        <Section 
          id="social" 
          icon="/icons.svg#social-icon" 
          title="Connect with us" 
          description="Join the Vite community"
        >
          {socialLinks.map((link, idx) => (
            <li key={idx}>
              <a href={link.href} target="_blank">
                <svg className="button-icon" role="presentation" aria-hidden="true">
                  <use href={link.icon}></use>
                </svg>
                {link.label}
              </a>
            </li>
          ))}
        </Section>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}
