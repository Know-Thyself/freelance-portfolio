'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Reveal from '@/animations/reveal'
import AnimatedCharacter from '../animations/char-animation'
import AnimatedWord from '../animations/word-animation'
import Link from 'next/link'
import styles from '../styles/home.module.css'
import Testimonials from './testimonials'

type ProfileProps = {
	id: number
	title: string
	intro: string | null
	sub_titles: string[]
	images: string[]
	description: string[]
}

type TestimonialsProps = {
	id: number
	name: string
	company: string
	address: string
	position: string
	testimony: string
	image: string
}

export default function Home({
	profile,
	testimonials,
}: {
	profile: ProfileProps
	testimonials: TestimonialsProps[]
}) {
	const rightScrollRef = useRef(null)
	const text: string = profile.intro!

	const rightVariant = {
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: 'spring', stiffness: 30, delay: 0.5, duration: 3 },
		},
		hidden: { opacity: 0, x: 100 },
	}

	return (
		<main className={styles.main}>
			<Reveal
				el='section'
				className={styles.hero}
				scale={0}
				type='spring'
				stiffness={30}
				delay={0.5}
				once
			>
				<Image
					src={'/images/hero-bg.jpg'}
					alt={profile.title}
					loading='eager'
					className={styles['sm-bg-img']}
					width={340}
					height={240}
					sizes='(min-width: 300px) 100vw'
					placeholder='blur'
					blurDataURL={'hero-bg.jpg'}
				/>
				<Image
					src={'/images/hero-bg-resized.jpg'}
					alt={profile.title}
					loading='eager'
					className={styles['lg-bg-img']}
					width={340}
					height={240}
					sizes='(min-width: 300px) 100vw'
					placeholder='blur'
					blurDataURL={'hero-bg.jpg'}
				/>
				<div className={styles['overlay-text']}>
					<AnimatedCharacter
						text={profile.title}
						className={styles.title}
						el={'h1'}
						scale={1.1}
						once
						delay={2}
						// x={20}
						// y={20}
						rotateX={180}
						rotateY={-540}
						opacity={1}
						duration={1}
					/>
					<Reveal
						el='div'
						rotateX={180}
						delay={12}
						// opacity={1}
						duration={2}
						scale={1}
						type='spring'
						stiffness={30}
						y={50}
						once
					>
						<div className={styles['links-wrapper']}>
							<Link href={'/services'} className={styles.link}>
								Services
							</Link>
							<Link href={'/projects'} className={styles.link}>
								Projects
							</Link>
						</div>
					</Reveal>
				</div>
			</Reveal>
			<div className={styles.wrapper}>
				<AnimatedWord
					text={text}
					el='p'
					delay={1}
					once
					// y={100}
					// x={200}
					// rotateY={360}
					rotateX={180}
					amount={0.1}
					scale={1}
					y={20}
					className={styles.intro}
				/>
				<section>
					{profile.sub_titles.map((title: string, index: number) => (
						<div key={index}>
							<AnimatedCharacter
								text={title}
								el={'h3'}
								y={20}
								once
								delay={index / 2 + 0.5}
								amount={1}
								className={styles['sub-title']}
							/>
							<div className={styles.development}>
								<Reveal
									el='div'
									x={-100}
									type='spring'
									stiffness={30}
									delay={0.5}
									duration={3}
									once
								>
									<Image
										src={`/images/${profile.images[index]}`}
										alt={title}
										loading='eager'
										className={styles['tech-img']}
										width={340}
										height={240}
										sizes='(min-width: 300px) 100vw'
										placeholder='blur'
										blurDataURL={`/images/${profile.images[index]}`}
									/>
								</Reveal>
								<motion.div
									variants={rightVariant}
									initial='hidden'
									whileInView='visible'
									viewport={{ root: rightScrollRef, amount: 0.5, once: true }}
								>
									<AnimatedWord
										text={profile.description[index]}
										el='h3'
										delay={0.5}
										y={150}
										x={100}
										rotateY={360}
										once
										className={`${styles.description} ${title === 'Frontend' ? styles.frontend : title === 'Backend' ? styles.backend : styles['full-stack']}`}
									/>
								</motion.div>
							</div>
						</div>
					))}
				</section>
			</div>
			<Testimonials testimonials={testimonials} />
			<Reveal
				el='div'
				delay={0.5}
				duration={1}
				scale={0}
				className={styles['action-btn-wrapper']}
			>
				<motion.div whileHover={{ scale: 1.1 }}>
					<Link href={'/services'} className={styles['action-btn']}>
						Check out My Services
					</Link>
				</motion.div>
			</Reveal>
		</main>
	)
}
