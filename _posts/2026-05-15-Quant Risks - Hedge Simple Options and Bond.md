---
title: Quant Risks - Hedge Simple Options and Bond
description: Introduction of Risk. Hedging strategy aginst market risk for (Vanilla) Options and Bond
date: 2026-05-14 23:00:00 +0800
categories: [ Quantitative Finance, Risk]
tags:
  - public
  - study
  - mafs5220
math: true
---

# 1 Source of Risk
Typical sources of Risks
1. **Market Risk** - Risk of change in portfolio value due to underlying assets (e.g. stock, bond, fx, commod)
2. **Credit Risk** - Risk of not receving promised repayment on outstanding investment (e.g. bonds)
3. **Operational Risk** - Risk of losses from internal process

In this chapter we will focus on Market Risk.

--- 

## 1.1 Market Risk
Market risk is the change in portfolio value due to the change of market value of the underlying assets (e.g. `asset price`, `exchange rate`, `commodity price`, etc).
This chapter will cover two examples of assets and how to hedge their Risk

| Portfolio     | Sources of risk     | Hedge method                   |
| :------------ | :------------------ | :----------------------------- |
| Options $V_t$ | Asset Price $S_t$   | Delta, Gemma, Theta, Vega, Rho |
| Bond          | Interest Rate $r_t$ | Bond Immunization              |

--- 

# 2 Options

## 2.1 Option pricing
> Option price with [[Black-Scholes Merton Model]]: 
> 
> CALL Option
> 
> $$c(t, S_t) = S_t e^{-q(T-t)} N(d_1) - K e^{-r(T-t)} N(d_2)$$
> 
> PUT Option
> 
> $$p(t, S_t) = K e^{-r(T-t)} N(-d_2) - S_t e^{-q(T-t)} N(-d_1)$$
> 
> where
> 
> $$\begin{align}
  d_1 &= \frac{\ln \frac{S_t}{K}+(r-q+\frac{\sigma^2}{2})(T-t)}{\sigma \sqrt{T-t} } \\
  d_2 &= \frac{\ln \frac{S_t}{K}+(r-q-\frac{\sigma^2}{2})(T-t)}{\sigma \sqrt{T-t} }= d_1-\sigma \sqrt{T-t} \\
  \end{align}$$
> 
{: .prompt-tip}


> Put-call Parity: 
> The price of CALL options and PUT options can be related by
> 
> $$p_t + S_t e^{-q(T-t)} = c_t + K e^{-r(T-t)}$$
> 
{: .prompt-tip}
 
## 2.2 Option Greeks
**Major Greeks** - The most important greeks

| Option Greek   | Definition                                     | Order | Property                                                                                                                                                              | Math formula for Put/Call                                                                                                                                                                                                                    |
| :------------- | :--------------------------------------------- | :---- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Delta $\Delta$ | $\Delta = \frac{\partial V}{\partial S_t}$     | 1     | Call: +ve (higher price, more payoff)<br>Put: -ve (higher price, less payoff)                                                                                         | $\Delta_c = e^{-q\tau}N(d_1)$<br>$\Delta_p = e^{-q\tau}(-N(-d_1))$                                                                                                                                                                           |
| Gamma $\Gamma$ | $\Gamma = \frac{\partial^2 V}{\partial S_t^2}$ | 2     | > 0<br>(convex curve, <br>and higher price, the delta goes more positive)                                                                                             | $\Gamma_c=\Gamma_p=e^{-q\tau}\phi(d_1)\frac{1}{S_t \sigma \sqrt{\tau}}$                                                                                                                                                                      |
| Theta $\Theta$ | $\Theta = \frac{\partial V}{\partial t}$       | 1     | time is measure in year. <br>need to $\frac{1}{252}$ when use                                                                                                         | $\Theta_c=q S_t e^{-q\tau} N(d_1) -r K e^{-r\tau} N(d_2) - S_t e^{-q\tau} \phi(d_1) \frac{\sigma}{2\sqrt{\tau}}$<br>$\Theta_p=q S_t e^{-q\tau} (-N(-d_1)) -r K e^{-r\tau} (-N(-d_2)) - S_t e^{-q\tau} \phi(d_1) \frac{\sigma}{2\sqrt{\tau}}$ |
| Vega $\Lambda$ | $\Lambda = \frac{\partial V}{\partial \sigma}$ | 1     | > 0<br>(with higher vol, will be more in-the-money and more out-of-money<br>but the negative penalty of out-of-money is 0)                                            | $\Lambda_c=\Lambda_p=S_t e^{-q\tau} \phi(d_1) \sqrt{\tau}$                                                                                                                                                                                   |
| Rho $\rho$     | $\rho = \frac{\partial V}{\partial r}$         | 1     | Call: >0 (r increase, reduce the cost (PV) of exercise LONG Call (-cash + Stock)<br>Put: <0 (r increase, reduce the payment (FV) of exercise LONG Put (-Stock + cash) | $\rho_c=\tau K e^{-r \tau} N(d_2)$<br>$\rho_p=\tau K e^{-r \tau} (-N(-d_2))$                                                                                                                                                                 |

**Minor Greeks** - Some names of the minor greeks, not typically used.

| Greek | Definition                                          | Order |
| ----- | --------------------------------------------------- | ----- |
| Vanna | $\frac{\partial^2 V}{\partial S_t \partial \sigma}$ | 2     |
| Vomma | $\frac{\partial^2 V}{\partial \sigma^2}$            | 2     |
| Charm | $\frac{\partial^2 V}{\partial S_t \partial t}$      | 2     |
| Speed | $\frac{\partial^3 V}{\partial S_t^3}$               | 3     |
| Color | $\frac{\partial^3 V}{\partial S_t^2 \partial t}$    | 3     |

### 2.2.1 Delta Hedging
#### 2.2.1.1 Construction
- Assume you short sell European Call option, to hedge the Delta risk, you also LONG $\Delta_t$ unit of asset
- Your portfolio is $f_t=-1*c_t + \Delta_t*S_t$
- Where we use [[Black-Scholes Merton Model]] to model  $S_t$ 

  $S_t=S_0 exp((\mu-\sigma^2/2)t+\sigma W_t)$  
  
  and the differential form 
  
  $d S_t = \mu S_t d_t + \sigma S_t d W_t$ 

- Your change of portfolio is $d f_t = - d c + \Delta_t d S_t + \Delta_t q S_t dt$   (assume continuous dividend q for asset) 
- using [[Ito's Lemma]]
  
  $$\begin{align}
   dc(t, S_t) &= c_t dt + c_S \cdot d S_t + \frac{1}{2} c_{SS} \cdot d{\langle S_t \rangle}_t  \\
   \text{where } dS_t = \mu S_t d_t + \sigma S_t dW_t 
   \text{ and } d{\langle S_t \rangle}_t = (\sigma S_t)^2d_t \\ 
   &= c_t dt+\mu S_t c_S + \sigma S_t c_S \cdot dW_t + \frac{1}{2} c_{SS} \cdot \sigma^2 S_t ^2 \cdot dt \\
   &= (c_t + \mu S_t c_S + \frac{1}{2} c_{SS} \cdot \sigma^2 S_t ^2)d_t + \sigma S_t c_S \cdot dW_t
   
   \end{align}$$
   
- There $df_t$
  
   $$\begin{align}
      df_t &= -[(c_t + \mu S_t c_S + \frac{1}{2} c_{SS} \cdot \sigma^2 S_t ^2)d_t + \sigma S_t c_S \cdot dW_t] 
      + \Delta_t d S_t + \Delta_t q S_t dt \\
      &= -[(c_t + \mu S_t c_S + \frac{1}{2} c_{SS} \cdot \sigma^2 S_t ^2)d_t + \sigma S_t c_S \cdot dW_t] 
      + \Delta_t (\mu S_t d_t + \sigma S_t d W_t) + \Delta_t q S_t dt \\  
      &= (-c_t - \mu S_t c_S - \frac{1}{2} c_{SS} \cdot \sigma^2 S_t ^2 +  \Delta_t \mu S_t + \Delta_t q S_t)d_t 
      + (-\sigma S_t c_S + \Delta_t \sigma S_t) dW_t 
   \end{align}$$
   
- The random part is only 
  
  $$(-\sigma S_t c_S + \Delta_t \sigma S_t) dW_t$$
  
- By choosing $\Delta_t = c_S$ this random terms goes to 0. (i.e. no Risk)
- When $\Delta = 0 \implies \text{No Change in portfolio value even when asset price changes}$ 
- If we have a portfolio, with total $\Delta=0$ then this portfolio is Delta Neutral (and should have return of Risk-free rate $r$) 

#### 2.2.1.2 How to Delta Hedge
> Find the $\Delta$ of the portfolio, then Buy the asset with  $\Delta$  unit
{: .prompt-tip}

### 2.2.2 Gamma Hedging
#### 2.2.2.1 Construction
- When $\Gamma$ is small, the change of asset price gives us small $\Delta$ (i.e. the portfolio value varies slightly)
- When $\Gamma$ is large, the change of asset price gives large $\Delta$ (i.e. the portfolio value varies a lot)
- more frequent balancing is needed in the case of large $\Gamma$
- Want $\Gamma = 0 \implies \text{No Change in the delta even when asset price changes}$
- this risk is due to we ignore the higher order terms in Ito's formula
- Not complete-risk free as we still ignore more higher-order terms, but they are usually very small

#### 2.2.2.2 How to Gamma Hedge
> Find the $\Delta$ and $\Gamma$ of the different portfolio
> Create a new weighted portlio $w$ s.t. 
> $\vec{w}^T\cdot\vec{\Delta} =0$  and $\vec{w}^T\cdot\vec{\Gamma} =0$
{: .prompt-tip}


## 2.3 Talyor Series Expansion and second-order-approximation:
> **Formula**
> 
> Single variant: $f(x) = \sum_{0}^{\infty}{\frac{1}{n!}f_x^{(n)}(a)(x-a)^n}$    
> 
> Multi variant: $f(x, y) = \sum_{0}^{\infty}{\frac{1}{n!}((x-a)\frac{\partial}{\partial x} + (y-a)\frac{\partial}{\partial y})^n(f(a,b))}$ 
> 
{: .prompt-tip}

What talyor series means?
- *Example 1a*:
	- Image you have a line $y=f(x)=2x +C$
	- Given $f(10) = 8$ 
	- What is $f(12)$ (without finding $f(x)$, because in general$f(x)$ can be complicated, and the derivatives are actually our Greeks) 
	- First find the derivatives $f'(x) = \frac{dy}{dx}=2$ , and hence $f''(x)=0$
	- intutitively, $f(12) = f(10) + slope * \text{difference in x}$ 
	- i.e. $f(12) = f(10) + f'(10) (12-10) = 8+2*2=12$
	- This is the basic of talyor series. we can find any value of $f(x)$ without knowing the explicit form of $f(x)$
	- we call this **(1st order) talyor series expansion** of $f(x)=f(10)+f'(10)(x-10)$ **at 10**
	- Noted: choosing the origin point 10 to expand could be critical, we hope this point to be 
		- continuous
		- differentiable
- *Example 1b*:
	- What happens if the curve is not a line? (e.g. 2nd order polynomials or even higher order)
	- Let $f(x)=2x^2-7x+C$, given $f(10)=8$, what is $f(12)$
	- First, for you to verify $C=-122$
	- We can still do it be talyor series up to 2nd order derivatives
	  
	 $$f'(x)=4x-7, f''(x)=4, f'''(x)=0$$
	- Hence 
	  
	  $$f'(10)=33, f''(10)=4$$
	- Then lets expand $f(x)$ at $x=10$
	  
	 $$f(x) = f(10) + f'(10)(x-10) + f''(10)(x-10)^2$$
	- $$\begin{align}
	  \text{L.H.S.} &= 2\cdot12^2-7\cdot12-122 = 82 \\ 
	  \text{R.H.S.} &= f(12) \\
	  &= f(10) + f'(10)(12-10) + \frac{1}{2} f''(10)(12-10)  \\
	  &= 8+33\cdot2+\frac{4\cdot2^2}{2} \\ &=82 = \text{L.H.S.} \\
	  \end{align}$$

---
# 3 Bond
## 3.1 Risk of bonds
Typical sources of Risks
- Market risk: Interest risk
- Credit risk: Default risk
In this chapter we will focus on Market Risk.

## 3.2 Bond Investment model
- Investment Horizon: $H$ years
- At $t=0$ invests capital into a bond portfolio
- At $t=H$, sells the bond
- During $t= (0, H)$, receive coupons from bond and reinvest into risk-free asset
- Risks:
	- Reinvetment risk: interest earned from reinvestment in risk-free asset
	- price risk: the price of selling the bond at $t=H$
- Assume interest rate is annualized, compound annually

## 3.3 Sensitivity of bond
- Duration: $\frac{\partial P}{\partial i}$ 
- Convexity: $\frac{\partial^2 P}{\partial i^2}$
- Modified Duration
### 3.3.1 Bond price
- discounted value of all future cash flows
- price $P(i)$
  
 $$P(i) = \sum_{k=1}^n{\frac{C_k}{(1+i)^{t_k}}}$$
 
### 3.3.2 Duration:
- Duration: $P'(i)$, where $i$ is the annual effective yield rate
  
   $$\begin{align}
   D(i) = P'(i) &= \sum_{k=1}^n{C_k (-t_k) (1+i)^{-(t_k+1)}} \\
   &= -\frac{1}{1+i}\sum_{k=1}^n{C_k t_k (1+i)^{-t_k}}  \quad \square\\
 \end{align}$$
   
- commonly we used the `modified duration` $D_{mod}(i)$ which is the `Duration` normalized by $P(i)$ as we are more concern on the percentage change instead of the price changes. So that we can compare the bonds. 
- We also noticed that this is always -ve, we want to make it positive for easier comparison, so this is defined as -ve
- `Modified Duration`: $-\frac{P'(i)}{P(i)}$, where $i$ is the annual effective yield rate
  
  $$\begin{align}
  D_{mod}(i) &= - \frac{P'(i)}{P(i)} \\
			 &= - \sum_{k=1}^n{\frac{C_k (-t_k) (1+i)^{-(t_k+1)}}{P(i)}} \\
			 &= \frac{1}{1+i}\sum_{k=1}^n{\frac{t_k \cdot C_k }{P(i) \cdot (1+i)^{t_k}}} \quad \square\\
  \end{align}$$
  
- We defined `Macaulay duration` as the weighted average of time required to receive the cashflows
  
  $$\begin{align}
   D_{mac}(i) &= \sum_{k=1}^n{\frac{t_k \cdot C_k }{P(i) \cdot (1+i)^{t_k}}} &\quad \square \\
   D_{mac}(i) &= (1+i)D_{mod}(i) &\quad \square \\
   \end{align}$$

### 3.3.3 Convexity
- `Convexity`:
  
   $$\begin{align}
   C(i) = P''(i) &= \sum_{k=1}^n{C_k (-t_k)(-(t_k+1))(1+i)^{-(t_k+2)}} \\
                 &= \sum_{k=1}^n{C_k \cdot t_k \cdot (t_{k} + 1) \cdot (1+i)^{-(t_k+2)}} \\
                 &= \frac{1}{(1+i)^2} \sum_{k=1}^n{C_k \cdot t_k \cdot (t_k + 1) \cdot (1+i)^{-t_k}} &\quad \square\\ 
  \end{align}$$
  
- `Modified Convexity`:
  
  $$\begin{align}
   C_{mod}(i) &= \frac{P''(i)}{P(i)} \\
              &= \frac{1}{(1+i)^2} \sum_{k=1}^n{\frac{C_k \cdot t_k \cdot (t_k + 1) }{P(i) (1+i)^{t_k}}} &\quad \square\\ 
   \end{align}$$
   
### 3.3.4 Use of Duration and Convexity
- Let $i_0$ be the initial yield rate
- Second-order approximation of the change in bond price
  
  $$\begin{align}
   P(i) &\xrightarrow[i_0]{Talyor Expansion} P(i_o) + P'(i_0)(i-i_0) + \frac{P''(i_0)(i-i_0)^2}{2!} + \frac{P^{(3)}(i_0)(i-i_0)^3}{3!} + \frac{P^{(4)}(i_0)(i-i_0)^4}{4!} + ... \\
   &\approx P(i_o) + P'(i_0)(i-i_0) + \frac{P''(i_0)(i-i_0)^2}{2!} \\
   \\
   \frac{P(i) - P(i_0)}{P(i_0)} &\approx \frac{P'(i_0)}{P(i_0)}(i-i_0) + \frac{1}{2} \frac{P''(i_0)}{P(i_0)} (i-i_0)^2 \\
   &= -D_{mod}(i_0)(i-i_0) + \frac{1}{2}C_{mod}(i_0)(i-i_0)^2 \quad\square\\ 
   \end{align}$$
   
- Portfolio of bonds
	- if all bonds have the same yield rate
	- Then $D_{mod}$ and $C_{mod}$ is just the weighted average of the duration
	- $D_{mod}(i) = \sum_{k=1}^n{\frac{P_k(i)}{P(i)} \cdot D_{mod}^k(i)}$
	- $C_{mod}(i) = \sum_{k=1}^n{\frac{P_k(i)}{P(i)} \cdot C_{mod}^k(i)}$
	  
### 3.3.5 Internal Rate of return (IRR)
- In bond, we use IRR to check the annual effecitve interest rate compouded interest
- $FV_H = P_0 (1+i_{IRR})^H$
  
  $$IRR = (\frac{FV_H}{P_0})^\frac{1}{H} - 1 \quad \square $$
  
## 3.4 Bond Price Immunization - Hedge risk against i
### 3.4.1 Construction
To study Bond price moment, we assumes
- at $t=0$, interest rate = $i_0$
- at $t > 0$, interest rate change to $i$
- This $i$ will not change for all the time horizon
### 3.4.2 IRR
- Further expands $IRR$
- let $m$ be the last coupon received before $H$, i.e. $t_m <= H < t_{m+1}$ 
- $P_H$ is the bond price at $H$
- $S_H$ is the cashflow at H received by coupons reinvested with $i$
  
  $$\begin{align}
   FV_H(i) &= P_H(i) + S_H(i) \\
   P_H(i) &= \sum_{k=m+1}^{n} {\frac{C_k}{(1+i)^{t_k-H}}} \\
   S_H(i) &= \sum_{k=1}^{n} {C_k(1+i)^{H-t_k}} \\
   FV_H(i) &= \sum_{k=m+1}^{n} {\frac{C_k}{(1+i)^{t_k-H}}} + \sum_{k=1}^{n} {C_k(1+i)^{H-t_k}} \\
   & = (1+i)^H \sum_{k=1}^{n} {C_k (1+i)^{-t_k}} \\ 
   & = (1+i)^H P_0(i) \\
   IRR &= [\frac{(1+i)^H P_0(i)}{P_0(i_0)}]^{1/H} - 1 \\
   &= \frac{1}{P_0(i_0)^{1/H}}(1+i)P_0(i)^{1/H} - 1 \quad \square
   \end{align}$$
   
### 3.4.3 Bond Immunization  $\frac{\partial IRR}{\partial i}=0$ 
- Set $\frac{\partial IRR}{\partial i}=0$ (as this is unsolvable, we only let this to 0 for $i=i0$)
  
   $$\begin{align}
  \frac{\partial IRR}{\partial i} &= [\frac{P_0(i)}{P_0(i_0)}]^{1/H} + 
  (1+i) [\frac{1}{P_0(i_0)}]^{1/H}\frac{1}{H} P_0(i)^{1/H-1}P'_0(i) \\
  \frac{\partial IRR}{\partial i}|_{i=i_0} &= [\frac{P_0(i_0)}{P_0(i_0)}]^{1/H} + 
  (1+i_0) [\frac{1}{P_0(i_0)}]^{1/H}\frac{1}{H} P_0(i_0)^{1/H-1}P'_0(i_0) \\
  0 &= 1 + (1+i_0)\frac{1}{H^*}\frac{P'_0(i_0)}{P_0(i_0)} \\
  H^* &=(1+i_0)(-\frac{P'_0(i_0)}{P_0(i_0)}) \\
  &= (1+i_0)D_{mod}(i_0) \\
  &= D_{mac}(i_0) \quad \quad \square
  \end{align}$$
  
- The Solution is that we can find a $H^*=D_{mac}(i_0)$  such that the $IRR$ have no movement verus $i$
- How can we choose make $H^*=D_{mac}(i_0)$?
	1. Choose a bond, find the $D_{mac}(i_0)$ and change our investment time horizon to $D_{mac}(i_0)$
	2. Find a bond in the market that its $D_{mac}(i_0)$ matches our investment time horizon $H$
	3. Construct a bond portfolio with different $D_{mac}(i_0)$ such that it matches our investment time horizon $H$.  
		- Recall the portfoilo Duration is just weighted sum $D_{mod}(i) = \sum_{k=1}^n{\frac{P_k(i)}{P(i)} \cdot D_{mod}^k(i)}$

### 3.4.4 Optimal Portfolio
- There could have more than onr Portfolio that have the same $D_{mac}(i_0)$, is there anyone that is the most optimal?
- Choose the portfolio with the **highest** Convexity $C_{mod}$
- Proof by second order approximation
  
  $$\begin{align}
   P_0(i) &= P_0(i_0) + (-D_{mod}(i_0)P_0(i_0))\cdot(i-i_0)+\frac{1}{2}(C_{mod}P_0(i_0))\cdot(i-i_0)^2 + ...
   \end{align}$$
   
- If there are two portfilio $A$, $B$, which have the same $D_{mac}(i_0)$ then they have the same $P_0(i_0)$, $D_{mod}(i_0)$ therefore, the $C_{mod}$ can give higher $IRR$
### 3.4.5 Extend to multiple changes of ir
- In the above model, we assumed only 1 change of $i$ at $t>0$
- if this changes multiple times, we need to reblance it
- For each payment day (after coupon is received) and before i changes. 
- we need to rebalance to match the future Duration

---
