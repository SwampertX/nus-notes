	.cpu arm7tdmi
	.eabi_attribute 20, 1
	.eabi_attribute 21, 1
	.eabi_attribute 23, 3
	.eabi_attribute 24, 1
	.eabi_attribute 25, 1
	.eabi_attribute 26, 1
	.eabi_attribute 30, 6
	.eabi_attribute 34, 0
	.eabi_attribute 18, 4
	.file	"pq8.c"
	.text
	.global	A_vmt
	.data
	.align	2
	.type	A_vmt, %object
	.size	A_vmt, 8
A_vmt:
	.word	A_Init
	.word	A_Foo
	.text
	.align	2
	.global	A_Init
	.arch armv4t
	.syntax unified
	.arm
	.fpu softvfp
	.type	A_Init, %function
A_Init:
	@ Function supports interworking.
	@ args = 0, pretend = 0, frame = 8
	@ frame_needed = 1, uses_anonymous_args = 0
	@ link register save eliminated.
	str	fp, [sp, #-4]!
	add	fp, sp, #0
	sub	sp, sp, #12
	str	r0, [fp, #-8]
	str	r1, [fp, #-12]
	ldr	r3, [fp, #-8]
	ldr	r2, .L2
	str	r2, [r3, #8]
	ldr	r3, [fp, #-12]
	sub	r2, r3, #1
	ldr	r3, [fp, #-8]
	str	r2, [r3]
	ldr	r3, [fp, #-12]
	lsl	r2, r3, #1
	ldr	r3, [fp, #-8]
	str	r2, [r3, #4]
	nop
	add	sp, fp, #0
	@ sp needed
	ldr	fp, [sp], #4
	bx	lr
.L3:
	.align	2
.L2:
	.word	A_vmt
	.size	A_Init, .-A_Init
	.align	2
	.global	A_Foo
	.syntax unified
	.arm
	.fpu softvfp
	.type	A_Foo, %function
A_Foo:
	@ Function supports interworking.
	@ args = 0, pretend = 0, frame = 16
	@ frame_needed = 1, uses_anonymous_args = 0
	@ link register save eliminated.
	str	fp, [sp, #-4]!
	add	fp, sp, #0
	sub	sp, sp, #20
	str	r0, [fp, #-16]
	ldr	r3, [fp, #-16]
	ldr	r3, [r3]
	ldr	r2, [fp, #-16]
	ldr	r2, [r2, #4]
	mul	r3, r2, r3
	str	r3, [fp, #-8]
	ldr	r3, [fp, #-8]
	mov	r0, r3
	add	sp, fp, #0
	@ sp needed
	ldr	fp, [sp], #4
	bx	lr
	.size	A_Foo, .-A_Foo
	.global	Main_vmt
	.data
	.align	2
	.type	Main_vmt, %object
	.size	Main_vmt, 4
Main_vmt:
	.word	Main_main
	.section	.rodata
	.align	2
.LC0:
	.ascii	"%d\012\000"
	.text
	.align	2
	.global	Main_main
	.syntax unified
	.arm
	.fpu softvfp
	.type	Main_main, %function
Main_main:
	@ Function supports interworking.
	@ args = 0, pretend = 0, frame = 16
	@ frame_needed = 1, uses_anonymous_args = 0
	push	{fp, lr}
	add	fp, sp, #4
	sub	sp, sp, #16
	str	r0, [fp, #-16]
	mov	r0, #12
	bl	malloc
	mov	r3, r0
	str	r3, [fp, #-8]
	ldr	r3, [fp, #-8]
	ldr	r3, [r3, #8]
	ldr	r3, [r3]
	mov	r1, #9
	ldr	r0, [fp, #-8]
	mov	lr, pc
	bx	r3
	mov	r0, #12
	bl	malloc
	mov	r3, r0
	str	r3, [fp, #-12]
	ldr	r3, [fp, #-12]
	ldr	r3, [r3, #8]
	ldr	r3, [r3, #4]
	ldr	r0, [fp, #-12]
	mov	lr, pc
	bx	r3
	mov	r3, r0
	mov	r1, r3
	ldr	r0, .L7
	bl	printf
	nop
	sub	sp, fp, #4
	@ sp needed
	pop	{fp, lr}
	bx	lr
.L8:
	.align	2
.L7:
	.word	.LC0
	.size	Main_main, .-Main_main
	.ident	"GCC: (Arch Repository) 11.2.0"
