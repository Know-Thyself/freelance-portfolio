'use client'

import { motion } from 'framer-motion'

interface Props {
	children: JSX.Element | JSX.Element[]
	el?: keyof JSX.IntrinsicElements
	className?: string
	x?: number
	y?: number
	scale?: number
	delay?: number
	once?: boolean
	onClick?: () => void
	rotateY?: number
}

export default function Reveal({
	children,
	className,
	el: Wrapper = 'div',
	x,
	y,
	scale,
	once,
	delay,
	onClick,
	rotateY,
}: Props) {
	return (
		<Wrapper className={className}>
			<motion.div
				variants={{
					hidden: { opacity: 0, x: x, y: y, scale: scale },
					visible: { opacity: 1, x: 0, y: 0, scale: 1, rotateY: rotateY },
				}}
				initial='hidden'
				whileInView='visible'
				viewport={{ amount: 0.5, once }}
				exit={{ opacity: 0, x: 0, y: 0 }}
				transition={{
					duration: 2,
					type: 'spring',
					stiffness: 20,
					delay: delay,
					repeatDelay: 1,
					delayChildren: delay,
				}}
				onClick={onClick}
			>
				{children}
			</motion.div>
		</Wrapper>
	)
}
