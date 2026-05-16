---
title: Quant Risks - Loss Tail Analysis II
description: Loss tail analysis with Extreme Value Theory
date: 2026-05-16 15:00:00 +0800
categories: [ Quantitative Finance, Risk]
tags:
  - public
  - study
  - mafs5220
math: true
---

# 1 Extreme Value Thoery (EVT)
> A beanch in pobability and statistic that examines the **tail distribution** of a distribution  <br>
> This allows us to study the likelihood and magnitude of rare but catastrophic event (`Black Swan event`)
{: . prompt-info}

Two major methods in EVT
- Block maxima/minima
- Exceedance

---

# 2 Block maxima/minima

Create blocks of loss (usually by time) and study the maximum / minimum of the Loss for the blocks

## 2.1 Maxima / minima
> let $X_1, X_2, ..., X_n$ be i.i.d RV and PDF is given by $f_X(x)$ and CDF is given by $F_X(x)$
> 
> `Sample Maxima`:
> 
> $$M_n = \max(\{X_i, i\in[1,n]\})$$
> 
> `Sample Minima`:
> 
> $$m_n = \min(\{X_i, i\in[1,n]\})$$
{: .propmt-info}

Then 

> CDF of $M_n$
> 
> $$\begin{align}
  F_{M_n} &= \mathbb{P}(M_n <= x)=\prod_{i=1}^n{\mathbb{P}(X_i <= x)}\\
  &= F_X(x)^n \quad \square\\
  \end{align}$$
{: .prompt-info}
 
 > CDF of $m_n$
 > 
 > $$\begin{align}
  F_{m_n} &= \mathbb{P}(m_n <= x)= 1- \mathbb{P}(m_n > x) \\ 
  &=1-\prod_{i=1}^n{\mathbb{P}(X_i > x)} \\
  &= 1-S_X(x)^n \quad \square\\
  \end{align}$$
{: .prompt-info}

## 2.2 Limiting Distribution
> If we simply take limit $\lim_{n\to\infty} M_n$
> 
> $$
  \lim_{n\to\infty} F_{M_n}(X) = \lim_{n\to\infty} F_X(x)^n\begin{cases}
  0 & \text{if }F_X(x)<1\\
  1 & \text{if }F_X(x)=1\\
  \end{cases}$$
>  
> This is not very meaningful.
{: .prompt-info}

- We will find some sequence $c_n, d_n$ such that

  $$\lim_{n\to\infty} \mathbb{P}(\frac{M_n-d_n}{c_n}<=x)=\lim_{n\to\infty} F_X(c_nx+d_n)^n=H(x)$$
  where $H(x)$ is non-degenerate probability
- $F_X(x) \in MDA(H)$ if $c_n, d_n$ exists

### 2.2.1 Examples
#### 2.2.1.1 Expotential Distribution

#### 2.2.1.2 Uniform Distribution

#### 2.2.1.3 Pareto Distribution

### 2.2.2 GEV Distribution
> `Fisher-Tippett Theorem`:
> 
> If $F_X \in MDA(H)$ then the limit distribution $H(x)$ convergence to 3 types 
> 
> Type I: Frechet Distribution $\Phi_\alpha(x) = \exp(-x^{-\alpha})$ for $x > 0$  
> 
> Type II: Weibull Distribution $\Psi_\alpha(x)= \exp(-(-x)^\alpha)$ for $x<=0$ 
> 
> Type III:  Gumbel Distribution $\Lambda_\alpha(x)=\exp(e^{-x})$ for $x\in\mathbb{R}$
{: .prompt-info}

> Choosing different $c_n, d_n$ will not change the type limit distribution, but only an affline transform of the function
>
>$$V(x) = U(Ax+B)$$
>
>where 
>$$A=\lim_{n\to\infty}{\frac{c_v}{c_u}}$$ 
>
>and
> 
> $$B=\lim_{n\to\infty}{\frac{d_v-d_u}{c_u}}$$ 
{: .prompt-info}

> The 3 types can be generalized into Generalized Extreme Value Distribution (GEV)
> 
> $$H_\xi(x) = \begin{cases}
  \exp(-(1+\xi x)^{-1/\xi}) & \text{if } \xi \ne 0 \\
  \exp(-e^{-x}) & \text{if } \xi = 0 \\
 \end{cases} $$
 > 
 > noted: the limit of is $\xi\to 0$ converges to the 2nd case, so this is continuous
{: .prompt-info}

#### 2.2.2.1 Model fitting of GEV distribution
- To fit the GEV distribution, we need to fit 3 params
- $H_{\mu,\sigma,\xi}(x) = H_\xi(\frac{x-\mu}{\sigma})$
- This can be done by Maximum Log-Likelihood Estimateion

#### 2.2.2.2 Using GEV to find VaR and ES
- If we set a fixed Block size, after fitting the GEV $H_{\mu, \sigma, \xi}(x)$
- This is an approximation of CDF of $M_n$
  
 $$F_{M_n} \approx H_{\mu, \sigma, \xi}$$
 
- VaR of $M_n$
  
  $$\begin{align}
  \text{Let }v &=\operatorname{VaR}_\alpha(M_n) \\
  F_{M_n}(v) &\approx H_{\mu, \sigma, \xi}(v)=\alpha \\
  H(\frac{t-\mu}{\sigma}) &= \alpha \\
  \operatorname{VaR}_\alpha(M_n) = v &= \mu + \sigma H^{-1} (\alpha) \quad &\square
  \end{align}$$
  
  - For ES it is hard to have explicit formula
	  - Usually use MC to calculate. 
	  - Calculate the VaR
	  - Use GEV to get a large sample $Y_i$ 
	  - Find the mean of $Y_i > VaR$

## 2.3 Problem of Block Maxima/Minima method
- We need to choose a proper block size
- We need a large block size so that $M_n$ is actually the tail loss, and to ensure $M_n$ has iid.
- We need also large number of blocks in order to estimate the params of GEV via MLE

---

# 3 Threshold Exceedance method

Data efficient way to model the tail distribution by keeping all tail data

## 3.1 Threshold
> Set $u > 0$ be a constant threshold. We keep data with $X_i > u$
> 
> When $u$ is large, these sample are big losses
>
> We want to estimate the tail distribution
> 
> $$\begin{align}
  F_u(x) &= \mathbb{P}(X-u <= x | X > u)\\
  &= \frac{\mathbb{P}(u<X<=u+x)}{\mathbb{P}(X>u)} \\
  &= \frac{F_X(u+x)-F_X(u)}{1-F_X(u)} \quad \square
  \end{align}$$
 {: .prompt-info}

## 3.2 Generalized Pareto Distribution (GPD)
> The distribution of $F_u(x)$ is model by GPD
> 
> $$\begin{align} 
  G_{\xi,\beta}(x) = \begin{cases}
  1-(1+\frac{\xi x}{\beta})^{-1/\xi} & \text{if } \xi \ne 0 \\
  1-e^{-x/\xi} & \text{if } \xi = 0 \\
  \end{cases}
 \end{align}$$
 > 
 > if $F_X \in MDA(H)$, then $F_u(x)$ can also be approximate by GPD (Pickands-Balkema-deHann theorem)
{: .prompt-info} 

## 3.3 Mean excess function
> After model the excess loss $X-u$ by GPD, we want to estimate the mean excess loss 
> which is similar to Expected Shortfall
> 
> $$\begin{align}
  e(u) &= \mathbb{E}[X-u|X>u] \\
  \end{align}$$
> By direct integration with the PDF of $G_{\xi,\beta}$ the integral converge to the same function (converge only when $\xi<1$)
> 
> $$e(u)= \frac{\beta}{1-\xi} \text{ for } \xi < 1$$
{: .prompt-info}

### 3.3.1 Relationship of to other threshold

We can get the mean excessed function of higher threshold $v>u$

$$\begin{align}
\beta_v &=\beta_u+ \xi(v-u) \quad &\square \\
F_v(x) &= G_{\xi,\beta_u + \xi(v-u)}(x) \quad &\square\\
e(v) &= \frac{\beta_u+\xi(v-u)}{1-\xi} \quad &\square\\
\end{align}$$

this only works for $v>u$

## 3.4 Calculating VaR and ES with GPD

### 3.4.1 VaR
> $$\operatorname{VaR}_\alpha(X)=v=((\frac{p}{1-\alpha})^\xi-1)\frac{\beta}{\xi}+u \quad \square$$
{: .prompt-into}

**Proof:**
  $$\begin{align}
 \text{let } p = \mathbb{P}(X>u) \\
 \text{let } v = \operatorname{VaR_\alpha(X)}  \\ \\
 F_u(x) &= \mathbb{P}(X < x+u | X>u) \\ 
 &= \mathbb{P}(u<X<x+u) / \mathbb{P}(X>u) \\
 \mathbb{P}(u<X<x+u) &= F_u(x) p \\
 F_X(x+u)-F_X(u) &= F_u(x) p \\ 
 F_X(x) &= F_u(x-u) p +F_X(u) \quad &\square \\
 \\
 \text{sub } v = x \\
 F_X(v) &= F_u(v-u)p + (1-p) \\
 \alpha &= F_u(v-u)p + (1-p) \\
 F_u(v-u) &=\frac{\alpha-1}{p}+1 \\
 G_{\xi,\beta}(v-u) &=1 - \frac{1-\alpha}{p} \\
 (1+\frac{\xi(v-u)}{\beta})^{-1/\xi} &= \frac{1-\alpha}{p} \\
 v&=((\frac{1-\alpha}{p})^{-\xi}-1)\frac{\beta}{\xi}+u \\
 \operatorname{VaR}_\alpha(X)=v&=((\frac{p}{1-\alpha})^\xi-1)\frac{\beta}{\xi}+u \quad &\square
 \end{align}$$
### 3.4.2 ES
> $$\operatorname{ES}_\alpha(X)=\frac{\beta+v-\xi u}{1-\xi} \quad \square$$
{: .prompt-info}

 To find ES, we can do 
 1. direct integration of ES using alternative formula
 2. Using Mean excess function of u

#### 3.4.2.1 ES by alternative formula
 $$\begin{align}
 \operatorname{ES}_\alpha(X) &= \frac{1}{1-\alpha}\int_\alpha^1{\operatorname{VaR}_x(X)}{dx} \\
 &= \frac{1}{1-\alpha}\int_\alpha^1{((\frac{p}{1-x})^\xi-1)\frac{\beta}{\xi}+u}{dx} \\
 &= \frac{1}{1-\alpha}(u-\frac{\beta}{\xi})(1-\alpha)+
 \frac{1}{1-\alpha}\frac{\beta}{\xi}p^\xi \cdot \int_\alpha^1(1-x)^{-\xi} dx \\
 \quad \text{let x'=1-x, dx=-dx', bounds=(}1-\alpha, 1-1=0\text{)}\\
 &=(u-\frac{\beta}{\xi})+\frac{1}{1-\alpha}\frac{\beta}{\xi}p^\xi \cdot \int_0^{1-\alpha}(x')^{-\xi} dx' \\
 &=(u-\frac{\beta}{\xi})+\frac{1}{1-\alpha}\frac{\beta}{\xi}p^\xi \cdot [\frac{1}{-\xi+1}(1-\alpha)^{-\xi+1}] \\
 &=(u-\frac{\beta}{\xi})+\frac{\beta}{\xi}(\frac{p}{(1-\alpha)})^\xi \cdot \frac{1}{1-\xi} \\
 &=\frac{1}{1-\xi}[(u-\frac{\beta}{\xi})+\frac{\beta}{\xi}(\frac{p}{(1-\alpha)})^\xi -\xi(u-\frac{\beta}{\xi}) ] \\
 &=\frac{1}{1-\xi}[v -\xi u + \beta  ] \\
 &=\frac{\beta+v-\xi u}{1-\xi} \quad &\square 
 \end{align}$$
#### 3.4.2.2 ES by Mean excess function of u
$$\begin{align}
\operatorname{ES}_\alpha(X) &= \mathbb{E}[X|X>v] \quad\text{ given v>u } \\
&=\mathbb{E}[X-v|X>v] + v \\
&= e_u(v) +v \\
&= \frac{\beta+\xi(v-u)}{1-\xi} + v \\
&= \frac{\beta+v-\xi u}{1-\xi} \quad &\square\\
\end{align}$$

---
