import { HTMLMotionProps, motion } from 'framer-motion'
import React from 'react'

interface ButtonProps extends HTMLMotionProps<"button">  {
  variant?: 'default' | 'ghost' | 'outline'
  size?: 'default' | 'icon'
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background'
  
  const variantStyles = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    outline: 'border border-input hover:bg-accent hover:text-accent-foreground'
  }
  
  const sizeStyles = {
    default: 'h-10 py-2 px-4',
    icon: 'h-10 w-10'
  }

  const classes = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  return (
    <motion.button className={classes} {...props}>
      {children}
    </motion.button>
  )
}
