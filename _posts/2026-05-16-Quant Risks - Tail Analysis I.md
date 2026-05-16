---
title: Quant Risks - Tail analysis I
date: 2026-05-16 12:00:00 +0800
categories: [ Quantitative Finance, Basic, Risk]
tags:
  - public
  - study
  - mafs5220
math: true
---

# 1 Loss analysis
## 1.1 Loss variable
Define $L_n$ is a loss variable
- When the $\Delta_t$ is small, we can just use $L_{n+1}=-(V_{n+1}-V_n)$ , with $V_n$ as our portfolio value, is $F_n$-measurable
- For long time period, the time value of money might also need to be accounted
	- Small time period
	  $$L_{n+1}=-(V_{n+1}-V_n)$$
	- Simple effective rate 
	  $$L_{n+1}=-(\frac{V_{n+1}}{1+r_{n+1}}-V_n)$$
	- Continuous rate: 
	  $$L_{n+1}=-(V_{n+1}e^{-\Delta_t}-V_n)$$

---

# 2 Risk Measure
## 2.1 Variance
More variance, more risk.
- $VAR = \mathbb{E}[(L_{t+1}-\mathbb{E}[L_{t+1}])^2]=\mathbb{E}[X^2]-\mathbb{E}[X]^2$
- $VAR=\vec{w}^T\mathbf{\Sigma}\vec{w}$ 
## 2.2 Value-at-Risk (VaR)
> Formal defintion: 
> $$\operatorname{VaR}_\alpha(L)=\inf\{x: \mathbb{P}(L<=x)>=\alpha\}$$
{: .prompt-tip}
- VaR is measuring the at $\alpha$ probabilty, the Loss <= VaR
- Typical formula (for continuous Loss): 
  $$\begin{align}
    \mathbb{P}(L<\operatorname{VaR}_\alpha(L)) &= \alpha \\ 
    F_L(\operatorname{VaR}_\alpha(L)) &=\alpha \\ 
    \operatorname{VaR}_\alpha(L) &= F_L^-1(\alpha)
    \end{align}$$
## 2.3 Expected Shortfall (ES)
> Formal defintion:
> $$\operatorname{ES}_\alpha(L)=\mathbb{E}[L|L>\operatorname{VaR}_\alpha(L)]$$
- The VaR give an estimateion of the loss bound
- ES wants to know if the Loss > VaR, what is the expectation of Loss
- Typical formula
  $$\begin{align}
  \operatorname{ES}_\alpha(L) &= \int_{VaR}^{\infty}{x\cdot\frac{f_L(x)}{\mathbb{P}(L>\operatorname{VaR}_\alpha(L))}}{dx} \\
  &= \int_{VaR}^{\infty}{x\cdot\frac{f_L(x)}{1-F_L(\operatorname{VaR})}}{dx} \\
  &= \int_{VaR}^{\infty}{x\cdot\frac{f_L(x)}{1-\alpha}}{dx} \\ 
  &= \frac{1}{1-\alpha}\int_{VaR}^{\infty}{x \cdot f_L(x)}{dx} \quad \square
  \end{align}$$
- Alternative formula
  $$\begin{align}
  \operatorname{ES}_\alpha(L) &= \frac{1}{1-\alpha}\int_{VaR}^{\infty}{x \cdot f_L(x)}{dx}  \\
  \text{let } y =F_L(x) \\ \text{ hence } dy=f_L(x)dx \\ \text{ and } x=F_L^-1(y) \\
  \text{upper bound} = F_L(\infty) = 1 \\ \text{lower bound} = F_L(VaR) = \alpha \\
  &= \frac{1}{1-\alpha} \int_{\alpha}^1 {F_L^-1(y)} {dy}\\ 
  &= \frac{1}{1-\alpha} \int_{\alpha}^1 {\operatorname{VaR}_y(L)} {dy} \quad \square
  \end{align}$$
## 2.4 Some Example
### 2.4.1 Pareto Distribution
> Pareto Distribution is a power law distribution, usually used for distribution of law. It has 80:20 rule.
> 
> $L \sim Pareto(\alpha, \theta)$
 {: .prompt-tip }
 
Pareto Type II - Lomax: Start from 0, have heavy tail, 
$$\begin{align}
f_L(x) &= \frac{\alpha\theta^\alpha}{(x+\theta)^{\alpha+1}}\\
F_L(x) &= 1 -  (\frac{\theta}{x+\theta})^\alpha \\
\mathbb{E}[X] &= \frac{\theta}{\alpha-1} \\
\operatorname{VAR}[X] &= \frac{\alpha\theta^2}{(\alpha-1)^2(\alpha-2)} \\
\operatorname{VaR}_\beta[X] &= \theta[(1-\beta)^{-1/c}-1] \\
\operatorname{ES}_\beta[X] &= \frac{\alpha\theta}{\alpha-1}(1-\beta)^{-1/c}-\theta \\
\end{align}$$
### 2.4.2 Normal Distribution
> Normal Distribution 
> 
> $L \sim N(\mu, \sigma)$
 {: .prompt-tip }
$$\begin{align}
L &= \mu+\sigma Z\\
f_L(x) &= \frac{1}{\sqrt{2\pi}\sigma}\exp(-{\frac{(x-\mu)^2}{2\sigma^2}}) \\
F_L(x) &= N(\frac{x-\mu}{\sigma}) \\
\mathbb{E}[X] &= \mu \\
\operatorname{VAR}[X] &= \sigma^2 \\
\operatorname{VaR}_\beta[X] &= \mu+\sigma N^{-1}(\beta) \\
\operatorname{ES}_\beta[X] &= \mu+\frac{\sigma}{1-\beta}\phi(N^{-1}(\beta)) \\
\end{align}$$
### 2.4.3 T-Distribution
> T-distribution: heavy tailed bell-shape
> 
> $L \sim T(\mu, \lambda, v)$
> $T_v = \frac{Z}{\sqrt{V / v}}$, where $V \sim \chi^2(v)$
 {: .prompt-tip }
$$\begin{align}
L &= \mu+\lambda T_v\\
f_L(x) &=  ...\\
F_L(x) &=  F_T(\frac{x-\mu}{\lambda}) \\
\mathbb{E}[X] &= \mu \\
\operatorname{VAR}[X] &= \sigma^2 \frac{v}{v-2} \\
\operatorname{VaR}_\beta[X] &= \mu+\lambda F_{T_v}^{-1}(\beta) \\
\operatorname{ES}_\beta[X] &= \mu+\frac{\lambda}{1-\beta}f_{T_v}(F_{T_V}^{-1}(\beta)) \cdot \frac{v+(F_{T_V}^{-1}(\beta))^2}{v-1} \\
\end{align}$$

## 2.5 Criteria of a good Risk Metric
### 2.5.1 Coherent Metric
> Coherent is a necessary condition for a good metric. 
{: .prompt-tip}

A good coherent metric must have these 4 properties

| Property               | Definition                                       | Remarks                                                                                                                    |
| ---------------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| Monotonicity           | if $L_1<L_2$,<br> then $\gamma(L_1)<\gamma(L_2)$ | If $Port_2$ is worse than $Port_1$ for all scenario, <br>then the risk measure of 2 is higher                              |
| Translation Invariance | $\gamma(L+c) = \gamma(L) + c$                    | adding deterministic loss just shift the loss <br>(e.g. adding risk-free deposit just lower the risk by the same quantity) |
| Poisitive Homogeneity  | $\gamma(\lambda L)=\lambda \gamma(L)$            | Scaling the portfolio will result in the same scale of the loss                                                            |
| Subadditivity          | $\gamma(L_1+L_2) < \gamma(L_1) + \gamma(L_2)$    | Diversification makes less risk                                                                                            |

### 2.5.2 Convex
> Convex is a necessary condition for a good metric.  
{: .prompt-tip}

> Coherent implies Convex
{: .prompt-tip}

| Property               | Definition                                                                              | Remarks                                                                                                                    |
| ---------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Monotonicity           | if $L_1<L_2$,<br> then $\gamma(L_1)<\gamma(L_2)$                                        | If $Port_2$ is worse than $Port_1$ for all scenario, <br>then the risk measure of 2 is higher                              |
| Translation Invariance | $\gamma(L+c) = \gamma(L) + c$                                                           | adding deterministic loss just shift the loss <br>(e.g. adding risk-free deposit just lower the risk by the same quantity) |
| Conexity               | $\gamma(\lambda L_1 + (1-\lambda) L_2 <= \lambda \gamma(L_1) + (1-\lambda) \gamma(L_2)$ | Diversification makes less risk                                                                                            |

### 2.5.3 Summary of Metric

| Metric                      | Monotonicity | Translation Invariance | Poisitive Homogeneity | Subadditivity | Conexity | Coherent？ | Convex ? |
| --------------------------- | ------------ | ---------------------- | --------------------- | ------------- | -------- | ---------- | -------- |
| **Variance**                | ❌            | ❌                      | ❌                     | ✅             | ❌        | ❌          | ❌        |
| **VaR**                     | ✅            | ✅                      | ✅                     | ❌             | ❌        | ❌          | ❌        |
| **Expected Shortfall (ES)** | ✅            | ✅                      | ✅                     | ✅             | ✅        | ✅          | ✅        |

---

# 3 How to estimate VaR and ES
## 3.1 Variance-Covariance Method
- Assume the $L$ have some distribution
- Fit $L \sim Dist$  and estimate the parameters via MLE (Maximum Log-Likelihood estimation )
- Mathematically get the formula of VaR and ES
- Pros: analytical way, can cover situation that havnt seen in empirical way
- Cons: Dist is hard to estimate, might need to use Monte-Carlo Distribution to get VaR and ES

## 3.2 Empirical estimation
- using empirical data, how the $\alpha$-percentile of the Loss
- Estimate the ES by taking mean of data > VaR
- Pros: model-free, does not need to estimate the distribution
- Cons: Need large sample size

---
