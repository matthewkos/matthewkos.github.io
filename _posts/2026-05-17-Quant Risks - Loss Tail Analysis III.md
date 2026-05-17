---
title: Quant Risks - Loss Tail Analysis III
description: Multi variant Loss Analysis and Coupla
date: 2026-05-17 03:45:00 +0800
categories: [ Quantitative Finance, Risk]
tags:
  - public
  - study
  - mafs5220
math: true
---

# 1 Recall Probability

## 1.1 Single-variant

$$\begin{align}

\mathbb{E}[A{X}+{b}] &= A\mathbb{E}[{X}] + {b} \\
COV[A,B] &= \mathbb{E}[(A-\mathbb{E}[A])(B-\mathbb{E}[B])] \\
COV[A+x,B+x] &= COV[A,B] \\
COV[cA,dB] &= cd \cdot COV[A,B] \\
COV[A+C,B] &= COV[A,B] + COV[C,B] \\
\end{align}$$

### 1.1.1 Normal distribution
> `Normal distribution` ($X \sim N(\mu, \sigma)$)
>  
> $$\begin{align}X=\mu+\sigma Z\end{align}$$
> 
> $$\begin{align}
  f_Z(x) = \phi(x) &= \frac{1}{\sqrt{2 \pi}}\exp(-\frac{x^2}{2}) \\
  F_Z(x) &= N(x) \\
  f_X(x) &= \frac{1}{\sqrt{2 \pi}\sigma}\exp(-\frac{(x-\mu)^2}{2\sigma^2}) \\
  F_X(x) &= N(\frac{x-\mu}{\sigma}) \\
  \mathbb{E}[X] &= \mu \\
  \operatorname{VAR}[X] &= \sigma^2 \\
  \end{align}$$
>
{: .prompt-info}

### 1.1.2 Student's-t distribution
> `T distribution` ($X \sim T_v(\mu, \lambda)$) is a bell-shape but heavy tail distribution
>  
> $$\begin{align}
  X &=\mu+\lambda T_v \\
  T_v &= \frac{Z}{\sqrt{\chi^2_v/v}} \quad \text{, where } V\sim\chi^2(v) \\
  \end{align}$$
> 
> $$\begin{align}
  f_{T_v} &= ... \\
  F_{T_v} &= ... \\
  F_X(x) &= F_{T_v}(\frac{x-\mu}{\lambda}) \\
  \mathbb{E}[X] &= \mu \\
  \operatorname{VAR}[X] &= \lambda^2 \frac{v}{v-2} \\
  \end{align}$$
>
{: .prompt-info}

## 1.2 Multi-variant

$$\begin{align}
\vec{X} &= 
\begin{bmatrix}
    X_1 \\
    X_2 \\
    X_3
\end{bmatrix} \\
F_\vec{X}(x_1, x_2, x_3) &= \mathbb{P}(X_1<x_1, X_2<x_2,X_3<x_3) \\
\mathbb{E}[\vec{X}] &= 
\begin{bmatrix}
    \mathbb{E}[X_1] \\
    \mathbb{E}[X_2] \\
    \mathbb{E}[X_3]
\end{bmatrix} \\
\mathbb{E}[A\vec{X}+\vec{b}] &= A\mathbb{E}[\vec{X}] + \vec{b} \\
COV[\vec{X}] = \Sigma &= \begin{bmatrix}
    COV(X_1, X_1) \quad COV(X_1, X_2)  \quad COV(X_1, X_3)  \\
    COV(X_2, X_1) \quad COV(X_2, X_2)  \quad COV(X_2, X_3)  \\
    COV(X_3, X_1) \quad COV(X_3, X_2)  \quad COV(X_3, X_3) 
\end{bmatrix} \\
COV[A\vec{X}+\vec{b}] &= ACOV[\vec{X}]A^T \\
\end{align}$$

Independence: $COV(X_1, X_2) = 0 $


### 1.2.1 Normal distribution (Multi-variant)
> `Multi-variant Normal Distribution` ($\vec{X}\sim N(\vec{\mu}, \Sigma$)
> 
> $$\begin{align}
  \vec{X}&=\vec{\mu}+A\vec{Z} \quad \text{ , where } \vec{Z} \sim N(0,I_n) \text{ and } AA^T=\Sigma \\
  \mathbb{E}[\vec{X}] &= \vec{\mu} \\
  \operatorname{COV[\vec{X}]} &= \Sigma
 \end{align}$$
{: .prompt-info}

> If  $Y = \vec{w}^T\vec{X}$, 
> 
> $$\begin{align}
  Y &\sim N(\vec{w}^T\vec{\mu}, \vec{w}^T\Sigma\vec{w}) \\
  Y &= (\vec{w}^T\vec{\mu}) + (\vec{w}^T\Sigma\vec{w})Z
  \end{align}$$
{: .prompt-info}

### 1.2.2 Student's-t distribution (Multi-variant)
>  `Multi-variant T Distribution` ($\vec{X} \sim T_v({\vec{\mu}, \Lambda})$)
>  
> $$\begin{align}
  \vec{X} &= \vec{\mu}+\sqrt\frac{v}{\chi^2_v}(AZ) \quad \text{ , where } AZ \sim N(0,\Lambda) \text{ and } AA^T=\Lambda \\
  \mathbb{E}[\vec{X}] &= \vec{\mu} \\
  \operatorname{COV[\vec{X}]} &= \frac{v}{v-2}\Lambda
  \end{align}$$
>
{: .prompt-info}
> If  $Y = \vec{w}^T\vec{X}$, 
> 
> $$\begin{align}
  Y &= \vec{w}^T\vec{\mu} + \sqrt\frac{v}{\chi^2_v} \vec{w}^T (AZ) \\
  &= \vec{w}^T\vec{\mu} + \sqrt\frac{v}{\chi^2_v} (\vec{w}^T\Lambda\vec{w}) Z \\
  &= \vec{w}^T\vec{\mu} + (\vec{w}^T\Lambda\vec{w}) T_v \\
  Y &\sim T_v(\vec{w^T}\vec{\mu}, \vec{w^T}\Lambda\vec{w})
  \end{align}$$
{: .prompt-info}

---

# 2 Coupla - Joint dependencies
>  $$\begin{align}
   F_\vec{X}(x_1, x_2, x_3, ...) = \mathbb{P}(X_1<x_1, X_2<x_2, X_3<x_3) \\
  \end{align}$$
> 
>Noted if $Y_i=F_{X_i}(X_i)$ it has uniform distribution to $[0,1]$, this gives us a "normalized" version to study the dependency without the mariginal distribution
>
>Coupla: 
>
>$$\begin{align} 
  C(u_1, u_2, u_3, ...) &= \mathbb{P}(F_{X_1}(X_1)<u_1,F_{X_2}(X_2)<u_2,F_{X_3}(X_3)<u_3,...) \\
  &= \mathbb{P}(X_1<F_{X_1}^{-1}(u_1), X_2<F_{X_2}^{-1}(u_2), X_3<F_{X_3}^{-1}(u_3),...) \\
  &= F_\vec{X}(F_{X_1}^{-1}(u_1), F_{X_2}^{-1}(u_2), F_{X_3}^{-1}(u_3),...) \quad\square
  \end{align}$$
>
{: .prompt-info}

*Proof:*

$$\begin{align} 
\mathbb{P}(Y<y) &= \mathbb{P}(F_{X}(X)<y) \\ 
&= \mathbb{P}(X < F_X^{-1}(y)) \\
&= F_X(F_X^{-1}(y)) \\ 
&= y \quad\text{ for } y\in[0,1]
\end{align}$$
## 2.1 Property of Copula
1. $C(u_1, u_2, ..., u_n)$ is the joint distribution on $\vec{U}$ where $U_i \in [0,1]$  is the CDF of $X_i$,  and $U_i$ is uniform
2. $C(\vec{u}) =0 \text{ if } \exists c_i =0$
3. Marginal distribution: $\mathbb{P}(U_i<u_i)= C(1,1,1,u_i,1,1,1) = u_i$ 
4. $\mathbb{P}(a_1<=U_1<=b_1, a_2<=U_2<=b_2)= C(b_1, b_2) + C(a_1, a_2) - C(a_1, b_2) - C(b_1, a_2)$ 
5. Joint distribution = marginal + dependence, copula only study the dependence, because all marginal is standardized to uniform distribution
6. Let $\vec{Y}$, where $Y_i=h_i(X_i)$ and $h_i$ is stictly increasing function, then $\vec{X}$ and $\vec{Y}$ have the same copula. <br>
   Need to be strictly increasing function, such that the ordering is preserved.

## 2.2 Common Copula
### 2.2.1 Independent
>$C(u_1, u_2, ..., u_n) = u_1u_2u_3...u_n$ 
{: .prompt-info}

### 2.2.2 Comonotonic (correlation coefficient=1)
>$C(u_1, u_2) = max(0, u1+u2-1)$ 
{: .prompt-info}

### 2.2.3 Countermonotonic (correlation coefficient=-1)
>$C(u_1, u_2, ..., u_n) = max(u_1, u_2, ..., u_n)$ 
{: .prompt-info}

### 2.2.4 Gaussian 

>For standardized $\vec{Y}$
>
> $$\begin{align}
  Y_i~N(0, 1), \vec{Y}\sim N(0, \Sigma=\begin{bmatrix}
  1 &\rho_{12} &\rho_{13} &\rho_{14} ...\\
  \rho_{12} &1 &\rho_{23} &\rho_{24} ...\\
  \rho_{13} &\rho_{23} & 1&\rho_{24} ...\\
  ... &...&...& 1\\
  \end{bmatrix})
  \end{align}$$
> 
> $$\begin{align} 
  C(u_1, u_2, ..., u_n) &= \mathbb{P}(Y_1<F_{Y_1}^{-1}(u_1), Y_2<F_{Y_2}^{-1}(u_2), ...) \\
  &= \mathbb{P}(Z_i<F_{Y_i}^{-1}(u_i),  ...) \\ 
  &= \mathbb{P}(Z_i<N^{-1}(u_i),  ...) \\ 
  &= N_n(N^{-1}(u_i), ...) \quad \text{ where } N_n \text{ is n-dim CDF of normal}
  \end{align}$$
>  
>For $X_i~N(\mu_i, \sigma_i)$, $\vec{X}\sim N(\vec{\mu}, \Sigma)$ 
>
> we can define 
> 
> $$Y_i = \frac{X_i-\mu_i}{\sigma_i}= h_i(X_i)$$
> 
> then 
> 
>$$\begin{align}
  C(u_1, u_2, ..., u_n) &= N_n(N^{-1}(u_i), ...) \quad\text{ where } N_n \text{ is n-dim CDF of normal}
  \end{align}$$
> 
{: .prompt-info}

### 2.2.5 T-copula
> Similar to Normal Copula
> 
>$$\begin{align}
 Y_i~T_v(0, 1), \vec{Y}\sim T_v(0, \Lambda=\begin{bmatrix}
 1 &\rho_{12} &\rho_{13} &\rho_{14} ...\\
 \rho_{12} &1 &\rho_{23} &\rho_{24} ...\\
 \rho_{13} &\rho_{23} & 1&\rho_{24} ...\\
 ... &...&...& 1\\
 \end{bmatrix})
 \end{align}$$
>  
> $$\begin{align} 
  C(u_1, u_2, ..., u_n) &= F_\vec{Y}(F_{T_v}^{-1}(u_i), ...) \quad\text{ where } N_n \text{ is n-dim CDF of normal}
  \end{align}$$
> 
 {: .prompt-info}
 
### 2.2.6 Archimedean Copula
> `Archimedean Copula` is a class of copula for bivariate RV, usful for a lot of financial problem.
>
> We first define a generator function $\phi(t)$. It must fulfill
> 1. stictly decreasing
> 2. convex
> 3. continuous
> 4. $\phi(0)=1$ and  $\lim_{t\to\infty} \phi(t)=0$ 
> 
> Then
> 
> $$C(u_1, u_2)=\phi(\phi^-1(u_1)+\phi^-1(u_2)$$
{: .prompt-info}

A summary table of different common `Archimedean Copula`

| Copula                  | $\phi(t)$                                                                                    | $C(u_1,u_2)$                                                                                                        | Property                                                                                            | Example situation                                                                                     |
| ----------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Gumbel**              | $$\phi(t)=e^{-t^{1/\theta}},\ \theta\ge 1$$                                                  | $$C(u_1,u_2)=\exp\!\left(-\left((-\ln u_1)^\theta+(-\ln u_2)^\theta\right)^{1/\theta}\right)$$                      | Upper tail dependence; $\lambda_U=2-2^{1/\theta}$, $\lambda_L=0$                                    | Insurance losses caused by natural disasters; claim frequency and claim severity can be jointly large |
| **Clayton**             | $$\phi(t)=(1+\theta t)^{-1/\theta},\ \theta\ge 0$$                                           | $$C(u_1,u_2)=\left(u_1^{-\theta}+u_2^{-\theta}-1\right)^{-1/\theta}$$                                               | Lower tail dependence; $\lambda_U=0$, $\lambda_L=2^{-1/\theta}$                                     | Stock log-returns with strong co-movement in market downturns                                         |
| **Generalized Clayton** | $$\phi(t)=(1+\theta t^{1/\delta})^{-1/\theta},\ \theta\ge 0,\ \delta\ge 0$$                  | $$C(u_1,u_2)=\left(1+\left((u_1^{-\theta}-1)^\delta+(u_2^{-\theta}-1)^\delta\right)^{1/\delta}\right)^{-1/\theta}$$ | Both upper and lower tail dependence; $\lambda_U=2-2^{1/\delta}$, $\lambda_L=2^{-1/(\theta\delta)}$ | Asset returns where both crash risk and boom risk may occur together                                  |
| **Frank**               | $$\phi(t)=-\frac{1}{\theta}\ln\!\left(1+(e^{-\theta}-1)e^{-t}\right),\ \theta\in\mathbb{R}$$ | $$C(u_1,u_2)=-\frac{1}{\theta}\ln\!\left(1+\frac{(e^{-\theta u_1}-1)(e^{-\theta u_2}-1)}{e^{-\theta}-1}\right)$$    | No tail dependence; $\lambda_U=0$, $\lambda_L=0$                                                    | Variables with general dependence but without strong tail co-movement                                 |


### 2.2.7 Bounds
For any copula, 
- Comonontoic is always the upper bound
- Countermonotonic is always the lower bound

## 2.3 Sklar Theorem
> Relationship of joint distribution and copula
> 
> Joint distribution is marginal distribution + copula
>
>$$\begin{align} 
F_\vec{X}(x_1, x_2,...)=C(F_{X_1}(x_1), F_{X_2}(x_2), ...)
\end{align}$$
{: .prompt-info}

To use Sklar theorem on a set of RV $X_i$ to find the joint distribution:
1. For each ${X_i}$, we use MLE to fit a mariginal distribution $F_{X_i}$ using empirical data on $X_i$
2. Assume a copula that capture the depencies $C(\vec{U})$
3. Obtain Joint distribution by Sklar theorem

---

# 3 Dependence Measure
> Copula is a functional form, hard to measure.
> 
> We want a scalar (similar to correlation coefficient) to easy measure the dependence
> 
> Two common indicators:
> 1. Rank Correlation (Kendall's Tau, Spearman's Rho)
> 2. Coefficient of Tail Dependence
{: .prompt-info}

## 3.1 Kendall's Tau
> This is  measuring the direction of the movement
> 
> $$\begin{align} 
  \rho_\tau &= \mathbb{P}((X_1-X_1')(X_2-X_2') > 0) - \mathbb{P}((X_1-X_1')(X_2-X_2') < 0) \\
  &\text{ where } (X_1', X_2') \text{ is I.I.D (joint) as } (X_1, X_2)
  \end{align}$$
> 
> $$-1 \le \rho_\tau \le 1$$
{: .prompt-info}

 See this two parts:
 - $\mathbb{P}((X_1-X_1')(X_2-X_2') > 0)$
	 - `concordant`: moving in same direction
	 - if we sample another sample of $(X_1, X_2)$, they will either
		 - getting larger together: $X_1' > X_1 \text{ and } X_2' > X_2$
		 - getter smaller together: $X_1' < X_1 \text{ and } X_2' < X_2$
 - $\mathbb{P}((X_1-X_1')(X_2-X_2') < 0)$
	 - `discordant`: moving in opposite directiontion
	 - if we sample another sample of $(X_1, X_2)$, they will move in different direction either
		 - $X_1' > X_1 \text{ and } X_2' < X_2$
		 - $X_1' < X_1 \text{ and } X_2' > X_2$

> To compute $\rho_\tau$, we use the Copula
> 
> $$\begin{align} 
  \rho_\tau &= 4\mathbb{E}[C(U_1, U_2)] - 1\\
  &= 4 \int_0^1 \int_0^1 C(u_1, u_2) \cdot c(u_1, u_2) du_1 du_2 - 1 \\
  & \text{where } c(u_1, u_2)=\frac{\partial^2 C}{\partial u_1\partial u_2}
  \end{align}$$
>
{: .prompt-info}

*Proof:*

$$\begin{align} 
 \rho_\tau &= \mathbb{P}((X_1-X_1')(X_2-X_2') > 0) - \mathbb{P}((X_1-X_1')(X_2-X_2') < 0) \\
 &= \mathbb{P}((X_1-X_1')(X_2-X_2') > 0) - (1-\mathbb{P}((X_1-X_1')(X_2-X_2') > 0)) \\
 &= 2\mathbb{P}((X_1-X_1')(X_2-X_2') > 0) - 1\\
 &= 2(\mathbb{P}(X_1>X_1', X_2>X_2')+\mathbb{P}(X_1<X_1', X_2<X_2')) - 1\\
 \because &(X_1, X_2) (X_1', X_2') \text{ are IID} \\
 \therefore &\mathbb{P}(X_1>X_1', X_2>X_2') = \mathbb{P}(X_1<X_1', X_2<X_2') \\
 &=4 \mathbb{P}(X_1<X_1', X_2<X_2') - 1 \\
 &=4 \mathbb{P}(F_{X_1}(X_1)<F_{X_1}(X_1'), F_{X_2}(X_2)<F_{X_2}(X_2')) - 1 \\
 &=4 \mathbb{P}(U_1<U_1', U_2<U_2) - 1 \\
 &=4 \int_0^1 \int_0^1 \mathbb{P}(U_1<u_1, U_2<u_2|U_1'=u_1, U_2'=u_2) c(u_1, u_2) du_1 du_2 - 1\\
 &=4 \int_0^1 \int_0^1 C(u_1, u_2) c(u_1, u_2) du_1 du_2 - 1\\
   \rho_\tau &= 4\mathbb{E}[C(U_1, U_2)] - 1\\
\end{align}$$

> For `Archimedean Copula`, we can use an the generator function to calculate
> 
> $$\begin{align} 
  \rho_\tau &= 1+4\int_0^1 {\frac{\phi^{-1}(t)}{\frac{d}{dt}\phi^{-1}(t)}} dt
  \end{align}$$
{: .prompt-info}

## 3.2 Coefficient of Tail Dependence

If $(X_1, X_2)$ is a pair of RV, if $X_1$ falls into tail distribution (> VaR), what is the likelihood $X_2$ also falls into tail dependencies <br>
example: portfolio loss: when diversification fails  

> Coefficient of upper tail dependence 
> 
> $$\begin{align} 
  \lambda_U &=\lim_{\alpha\to1^-} \mathbb{P}(X_2>F_{X_2}^{-1}(\alpha)|X_1>F_{X_1}^{-1}(\alpha)) \\
  \lambda_L &=\lim_{\alpha\to0^+} \mathbb{P}(X_2<F_{X_2}^{-1}(\alpha)|X_1<F_{X_1}^{-1}(\alpha)) \\
  \end{align}$$
{: .prompt-info}

> For Copula:
> 
> $$\begin{align} 
  \lambda_U &=\lim_{\alpha\to1^-} \frac{1-2\alpha+C(\alpha, \alpha)}{1-\alpha} \\
  \lambda_L &=\lim_{\alpha\to0^+} \frac{C(\alpha,\alpha)}{\alpha} \\
  \end{align}$$
> 
> For Archimedean Copula:
> 
> $$\begin{align} 
  \lambda_U &=\lim_{\alpha\to1^-} \frac{1-2\alpha+\phi(2\phi^{-1}(\alpha))}{1-\alpha} \\
  \lambda_L &=\lim_{\alpha\to0^+} \frac{\phi(2\phi^{-1}(\alpha))}{\alpha} \\
  \end{align}$$
{: .prompt-info}

---
