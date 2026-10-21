---
marp: true
theme: sgpgi-scholar
size: 16:9
title: Real World Evidence
paginate: true
footer: 'Real World Evidence (2026) · CC BY-NC 4.0'
---

<!-- _class: titlepage -->
<!-- _paginate: false -->
<!-- _footer: '' -->

<div class="topleft">


</div>

# Real-World Evidence
#### Target Trial Emulation, Propensity Scores & Immortal Time Bias


### Dr Santam Chakraborty
#### Senior Consultant, Department of Radiation Oncology
###### Tata Medical Center, India

---

## What is the difference between efficacy and effectiveness ?

- **Efficacy** : The extent to which an intervention does more **good** than **harm** under ideal circumstances.
- **Effectiveness** : The extent to which an intervention does more **good** than **harm** under usual circumstances of practice.
- When does Efficacy **not** translate into effectiveneness:
  - Diagnostic inaccuracy : Not picking the correct patient for treatment
  - Provider compliace : Lack of adherence to guidelines
  - Patient incompliance : Psychological / Social / Economic circumstances
  - Coverage of health services  

---

---

## 1. Why real-world evidence needs a causal framework

- Routine-care data (EHR, claims, registries) let us look at effectiveness and safety in the patients trials tend to leave out. Older patients with cancer are the obvious example [29].
- Most of the trouble comes from how a study is designed and from confounding by indication. Messy data is the smaller problem.
- A useful habit: write down the randomised trial you would run if you could, then see how closely the data let you copy it. That trial is the target trial [1].
- Copying the trial fixes design mistakes, like a muddled start of follow-up. It does not fix confounders nobody measured, and in oncology fitness is the big one.

---

## 2. Target trial emulation

- Write the protocol first, before opening the data [1].
- Then map each element onto the database. Where a piece can't be mapped, say so. That gap is a limitation of the study.
- Spelling it out exposes choices you would never make in a real trial, like defining treatment by something that happens after follow-up begins [2].
- HARPER (from ISPE and ISPOR) is a template for writing the protocol [4]. TARGET, published in 2025, is the 21-item checklist for reporting it [3].
- A simple test: if you couldn't have randomised it this way, you shouldn't analyse it this way.

---

## 3. Protocol components and how we emulate them

| Component | Target trial | Emulation in routine data |
|---|---|---|
| Eligibility | Criteria met at baseline | Applied using data recorded up to $t_0$ only |
| Treatment strategies | e.g. add drug A to standard therapy, or not | Defined from prescriptions or procedures, with grace periods stated |
| Assignment | Randomisation | Observed initiation, with adjustment to approximate exchangeability |
| Follow-up | Starts at randomisation | Starts at $t_0$, when eligibility is met and the strategy is assigned |
| Outcome | Adjudicated events (OS, DFS) | Validated algorithms, registry or linked death data |
| Causal contrast | ITT or per-protocol | ITT-like, or per-protocol with censoring weights |
| Analysis plan | Pre-specified | Pre-specified, including confounders and sensitivity analyses |

Seven components as described in [1]. The protocol can be written in the HARPER template [4].

---

## 4. An oncology emulation in practice: SEER-Medicare

- Petito and colleagues emulated two target trials in SEER-Medicare, a linkage of cancer registries with Medicare claims, to study older patients who are under-represented in trials [29]:
  - adjuvant fluorouracil-based chemotherapy in stage II colorectal cancer;
  - adding erlotinib to gemcitabine in advanced pancreatic cancer.
- Each protocol was modelled on an existing randomised trial, and each allowed a grace period for starting treatment (3 months after baseline in the colorectal emulation, 12 weeks in the pancreatic one) [29].
- Real patients start treatment days or weeks after the decision. The analysis has to handle that without creating immortal time [2,29].
- The emulated results were not meaningfully different from the elderly subgroup analyses of the original trials [29].

---

## 5. Time zero

- Time zero ($t_0$) is the moment someone becomes eligible, is assigned to a strategy, and follow-up starts. All three should happen together [1,2].
- When they don't, things go wrong in two ways. Start follow-up before treatment is assigned and you create immortal time. Decide eligibility after treatment has begun and you introduce selection bias [2].
- The oncology version is familiar: compare "responders" with "non-responders" from the start of treatment and you have conditioned on surviving long enough to be assessed. For that comparison, time zero is the response assessment, not the first cycle [8,28].
- Baseline covariates (stage, performance status, prior lines of therapy) have to be measured at or before $t_0$. Otherwise they can be effects of the treatment.

---

## 6. Immortal time bias: what it is

- Immortal time is a stretch of follow-up in which the outcome can't happen, because of how we defined exposure. In oncology it is usually called guarantee-time bias.
- It arises whenever survival timed from enrolment or randomisation is compared across groups defined by something that happens later: objective response, toxicity, a subsequent treatment, or compliance [28].
- In databases the usual version is: call a patient "treated" if they ever received the drug during follow-up. To land in that group they had to survive until the first prescription [5].
- That waiting time is credited to the treated group, so the drug looks better than it is. Adjusting for covariates won't rescue it, because it's a problem of how exposure was classified.

---

## 7. How it arises

- Causal diagrams show two routes. One is confounding by survival until treatment is allocated. The other is selection bias from conditioning on survival until eligibility [6].
- Time-fixed classification puts unexposed person-time into the treated group. That dilutes the treated event rate and pulls the hazard ratio toward benefit [5].
- Simply dropping the immortal period doesn't fully fix it, and competing risks can make it worse [6].
- The reliable fix is in the design: line up time zero, eligibility and assignment, and exclude prevalent users [2,6].

---

## 8. Where oncologists have met it

| Setting | What goes wrong | Source |
|---|---|---|
| Metformin and cancer incidence or mortality | 13 observational studies had immortal time bias. Apparent cancer reductions ranged from 20% to 94%. Three studies that avoided the biases found no effect | [27] |
| "Responders live longer" | Response is only known to patients who survive long enough to be assessed. Responders get credit for the waiting time | [8,28] |
| Toxicity, subsequent therapy, compliance | Anyone classified by an event after enrolment has a guaranteed event-free period | [28] |
| Amenorrhoea after chemotherapy, early breast cancer (IBCSG 13-93) | Used to contrast a naive comparison of disease-free survival with an 18-month landmark analysis | [28] |

---

## 9. Two analyses that don't solve it

- **Time-fixed Cox model.** Exposure is assigned from $t_0$ even though it starts later, so immortal time counts as exposed. The bias runs toward benefit [5].
- **Excluding the immortal time.** Follow-up starts at treatment initiation, so you compare people who survived to treatment with untreated people followed from entry. That is selection bias [5,6].
- The metformin literature shows how much this matters. Studies with these problems reported 20% to 94% lower cancer risk, while three studies that avoided them found no effect [27].
- Neither analysis reproduces the target trial, because people don't share the same $t_0$ [2].

---

## 10. Landmark analysis

- Pick a landmark time $L$ after cohort entry. Classify exposure by what happened before $L$, start follow-up at $L$, and keep only people alive and event-free at $L$ [8].
- Anderson and colleagues proposed it for exactly the "responders live longer" problem in cancer [8].
- It removes immortal time, but it has costs:
  - the result only applies to people who survive to $L$;
  - early events are thrown away, so you lose power;
  - the answer moves with the landmark, so show more than one [9].
- It works best when $L$ means something clinically, such as the first response assessment. Pre-specify it. The breast cancer IBCSG 13-93 amenorrhoea analysis is a good worked example of naive versus 18-month landmark [28].

---

## 11. Time-varying Cox models

- Treat exposure as time-dependent. A patient contributes unexposed person-time until they start, and exposed person-time afterwards [5,7].
- This removes immortal time and holds up well in simulations [7].
- Three limits worth remembering:
  - it assumes no unmeasured time-varying confounding, which is a lot to ask when performance status can change from one cycle to the next;
  - it doesn't line up eligibility and baseline covariates with $t_0$, so it isn't a full target trial;
  - if earlier treatment changes later confounders (performance status, tumour burden, neutrophil count), ordinary Cox adjustment is biased and you need g-methods [12].

---

## 12. Fixing it by design: sequential trials

- Emulate a series of nested trials. At each time $t_k$ (every month, say) take everyone eligible and assign them using only what is known at $t_k$ [10,11].
- One patient can appear in several trials until they start treatment. Pool the trials and use a variance method that allows for that, such as the bootstrap [11].
- Allowing repeated eligibility improved efficiency in an emulation of colorectal cancer screening trials [10].
- Immortal time can't arise, because exposure is never defined from information after $t_k$ [2].

---

## 13. Case study: metformin and cancer

- From 2005 onwards, observational studies reported impressive cancer reductions with metformin, and these helped trigger randomised trials of metformin as an anticancer treatment [27].
- Suissa and Azoulay's 2012 review found that 13 observational studies had immortal time bias. Nine had not considered time-window bias. Others compared first-line metformin with second- or third-line drugs given later in the disease, which is a comparator problem [27].
- The biased studies reported cancer reductions of 20% to 94%. The three studies that avoided these biases found no effect on cancer incidence [27].
- What to check in any drug-repurposing study:
  - how exposure was defined and when follow-up began;
  - whether new users were compared with new users;
  - whether the exposure was lagged, since a drug started weeks before diagnosis can't have caused or prevented the cancer.

---

## 14. Propensity scores: the basics

- The propensity score is the probability of getting the treatment, given baseline covariates:

$$e(\mathbf{X}) = \Pr(A = 1 \mid \mathbf{X})$$

- It is a balancing score. Among patients with the same score, the measured covariates look similar in treated and untreated groups [13,14].
- The aim is to make the groups comparable on what we measured, much as randomisation would [14].
- It can be used for matching, stratification, weighting or covariate adjustment [14].
- Only measured covariates get balanced.

---

## 15. The assumptions behind a causal reading

| Assumption | In clinical terms |
|---|---|
| Conditional exchangeability, $Y^a \perp A \mid \mathbf{X}$ | Once we adjust, nothing unmeasured drives both who gets treated and the outcome. In oncology this means fitness, tumour biology and patient preference are captured. This is the weak point in most RWE. |
| Positivity, $0 < e(\mathbf{X}) < 1$ | Every kind of patient could plausibly have received either strategy. |
| Consistency | "Treatment" is defined precisely enough that its effect means one thing (dose, line of therapy, duration). |

- Exchangeability and positivity together are called strong ignorability [13].
- When positivity is nearly violated you see extreme scores, enormous weights and unstable estimates [14,18].

---

## 16. Building the propensity score model

- Include true confounders and variables that predict the outcome. Outcome predictors cut variance without adding bias [15]. In oncology that usually means stage, histology, biomarkers, performance status, comorbidity and prior therapy.
- Variables that only predict treatment (instrument-like) add variance and don't reduce bias [15].
- Choose variables with clinical knowledge and causal reasoning, not by stepwise prediction of treatment [15,16].
- Everything has to be measured at or before $t_0$ [2].
- Don't judge the model by its c-statistic. A high value is neither necessary nor sufficient for controlling confounding [16]. A very high one also means treatment was nearly predetermined, so overlap is thin.
- Look at balance after adjustment and at how much the score distributions overlap [14].

A good question to ask: which patient factors drive prognosis, not just which ones drive prescribing?

---

## 17. Checking balance with standardised differences

- Use standardised mean differences, not p-values. Balance is a property of the sample you analyse, and SMDs don't depend on sample size [14]:

$$\text{SMD} = \frac{\bar{x}_1 - \bar{x}_0}{\sqrt{(s_1^2 + s_0^2)/2}}$$

- A common rule of thumb is that an absolute SMD below 0.1 is negligible imbalance [14].
- Report SMDs before and after adjustment (weighted SMDs if you weight) for every prognostic covariate.
- Check higher-order terms and plausible interactions too [14].

---

## 18. Inverse probability of treatment weighting

- Weighting builds a pseudo-population in which treatment is unrelated to the measured covariates:

$$w_i = \frac{A_i}{e(\mathbf{X}_i)} + \frac{1 - A_i}{1 - e(\mathbf{X}_i)}$$

- It targets the average treatment effect (ATE) across the whole eligible population [14].
- Stabilised weights reduce variance [12]. Extreme scores still give huge weights, high variance and bias [18].
- Always look at the weight distribution, especially the tails, and report it [19].

---

## 19. Overlap weighting

- Each patient is weighted by the probability of getting the other treatment [17]:

$$w_{\text{treated}} = 1 - e(\mathbf{X}), \qquad w_{\text{control}} = e(\mathbf{X})$$

- The target is the ATO, the effect in patients for whom either treatment is a reasonable choice (clinical equipoise) [17]. In oncology that is often the patients in the grey zone between two standards of care.
- The weights are bounded. With a logistic PS model, overlap weights give exact mean balance on every covariate in the model, and the smallest asymptotic variance among balancing weights [17].
- It also works for time-to-event outcomes, with bigger gains when overlap is poor [24].
- One caution. The ATO isn't the ATE, and if frail patients are left untreated for reasons we can't see, overlap weighting can be more biased than IPTW [19].

---

## 20. Comparing the adjustment methods

| Method | Target estimand | With poor overlap | Balance |
|---|---|---|---|
| IPTW | ATE (whole eligible population) | Unbounded weights, high variance, possible bias [18] | Balanced in the weighted sample if the PS model is adequate [14] |
| Overlap weighting | ATO (equipoise population) | Bounded and stable [17,18] | Exact mean balance for covariates in a logistic PS model [17] |
| PS matching (caliper) | Usually ATT | Unmatched patients are discarded [14] | Balance in the matched sample [14] |
| IPTW with trimming | ATE in the retained population | Fewer extreme weights, but the population changes [19] | As IPTW, in the trimmed sample |

Pick the method to suit the clinical question and the population, not the data.

---

## 21. Trimming extreme propensity scores

- A simulation compared three approaches [19]:
  - Crump: drop scores below 0.1 and above 0.9;
  - Stürmer: asymmetric trimming at the 5th percentile of the treated and the 95th of the untreated;
  - Walker: preference-score trimming below 0.3 and above 0.7.
- With no unmeasured confounding, Crump trimming and overlap weighting gained efficiency [19].
- When frail patients are left untreated because of unmeasured factors, only Stürmer and Walker trimming reliably reduced bias [19]. That is a very familiar pattern in oncology.
- Trimming changes who the answer applies to. Say who was removed and why.

---

## 22. Time-varying confounding and g-methods

- In longitudinal cancer care, a covariate such as performance status, tumour response or neutrophil count can be both a confounder of the next treatment decision and a mediator of earlier treatment.
- Conventional adjustment then goes wrong. It blocks part of the treatment effect and can open a collider path [12].
- G-methods are built for this: marginal structural models (inverse probability weights at each time point), the parametric g-formula and g-estimation [12].
- They estimate sustained strategies such as "treat until progression" versus "never treat". They still rely on no unmeasured confounding at each time, positivity, consistency and correct models, so they are not a guarantee [12].

---

## 23. Unmeasured confounding: the main threat left

- Propensity scores and target trial emulation deal with measured baseline confounders and design flaws. They can't touch what isn't in the data.
- In oncology the usual suspects are performance status and overall fitness, frailty, tumour biology not captured in claims, treatment intent and patient preference.
- The tell-tale signs are an effect that is too big, or one that a randomised trial later contradicts.
- Next come a classic oncology example of a trial reversing an observational signal, then two non-cancer illustrations of how negative controls expose bias. After that, how to put a number on the problem [20,22,23].

---
## 24. Confounding in one picture: fitness in oncology

<pre class="mermaid">
flowchart TD
  F["Fitness (ECOG)<br/>not in the data"]:::unm
  M["Stage, age, comorbidity<br/>measured, adjusted for"]:::meas
  T["Treatment<br/>e.g. adjuvant chemo"]:::plain
  S["Survival<br/>outcome"]:::plain
  F -. "fitter patients are treated more often" .-> T
  F -. "fitter patients live longer" .-> S
  T -- "effect we want" --> S
  M --> T
  M --> S
  classDef unm fill:#FAECE7,stroke:#993C1D,stroke-dasharray:5 4,color:#712B13
  classDef meas fill:#E1F5EE,stroke:#0F6E56,color:#085041
  classDef plain fill:#F1EFE8,stroke:#5F5E5A,color:#444441
  linkStyle 0,1 stroke:#D85A30,stroke-width:2px
  linkStyle 3,4 stroke:#1D9E75,stroke-width:2px
</pre>

- Stage, age and comorbidity are measured, so weighting or matching can balance them.
- Fitness isn't in the data. It still pushes treatment toward fitter patients and gives them longer survival, so the drug can look better than it is.
---

## 25. Case: beta-carotene and lung cancer

- Observational studies had linked higher intake of carotenoid-rich foods and higher blood levels of beta-carotene with less lung cancer. That prompted large prevention trials in people at high risk.
- **ATBC** (29,133 male smokers, 20 mg beta-carotene daily): lung cancer incidence was 18% higher in the beta-carotene arms [30].
- **CARET** (18,314 smokers, former smokers and asbestos-exposed workers, beta-carotene plus vitamin A): lung cancer RR 1.28 (1.04–1.57), lung cancer death RR 1.46 (1.07–2.00), all-cause death RR 1.17 (1.03–1.33) [31]. The trial was stopped early.
- The usual explanation is that people who eat plenty of fruit and vegetables also differ in many other healthy ways, which diet questionnaires don't capture. Supplement doses also far exceed dietary intake, so confounding is not the only possibility.
- Lesson: a protective observational signal for a cancer-preventive agent is a hypothesis. Benchmark it against randomised evidence before acting.

---

## 26. Negative controls in action (two non-cancer examples)

- **Influenza vaccine in older adults** [25]. Death rate ratios for vaccinated versus unvaccinated people were 0.39 (0.33–0.47) before the season, 0.56 (0.52–0.61) during it, and 0.74 (0.67–0.80) after. The "protection" was biggest when the vaccine couldn't be working. Adjusting for diagnosis codes made it worse.
- **Statin adherence** [26]. High adherers had fewer motor vehicle accidents (HR 0.75, 0.72 to 0.79) and workplace accidents (HR 0.77, 0.74 to 0.81). Statins can't do that, so adherence marks healthier behaviour.
- Same idea each time: if the exposure "protects" in a period or for an outcome where it cannot act, residual confounding is present [23].
- For oncology RWE, natural negative controls include outcomes the drug cannot plausibly affect, and the period before treatment started. Decide on them in advance.

---

## 27. What the cases teach

| Case | What looked wrong | What exposes it |
|---|---|---|
| Beta-carotene and lung cancer [30,31] | Observational "protection", randomised harm | Benchmark against randomised evidence |
| Metformin and cancer [27] | Reductions of 20% to 94% | Correct time zero and comparator, then re-estimate |
| Influenza vaccine [25] | "Benefit" before the season began | Negative-control time period |
| Statin adherence [26] | "Benefit" for accidents | Negative-control outcome |
| SEER-Medicare emulations [29] | Agreement with the trials' elderly subgroups | Benchmarking, when a trial exists |

- I calculated E-values from the vaccine rate ratios. The in-season 0.56 gives about 3.0 and the pre-season 0.39 gives about 4.6. Bias of that size was real, so confounding this strong does happen [20,25].
- A big E-value doesn't prove a result is robust. Compare it with the confounding you have actually seen in similar settings [21].

---

## 28. The E-value

- The E-value is the minimum strength of association, on the risk ratio scale, that an unmeasured confounder would need with both treatment and outcome (beyond the measured covariates) to explain away the observed effect [20].
- It needs no assumptions about how common the confounder is or how it is distributed [20].
- Bigger means more robust.
- Report it for the point estimate and for the confidence limit closest to the null [20,21].
- It doesn't replace thinking about which confounders are plausible, and it can be reported selectively [21].

---

## 29. E-value: formula and a worked example

For an observed risk ratio $RR \ge 1$ (invert it if $RR < 1$) [20]:

$$\text{E-value} = RR + \sqrt{RR \times (RR - 1)}$$

Say a real-world cohort reports an adjusted HR of 0.60 for recurrence in an adjuvant setting, where recurrence is rare (under 15%), so HR $\approx$ RR.
- Invert: $1/0.60 = 1.67$
- E-value $= 1.67 + \sqrt{1.67 \times 0.67} = $ **2.72**

What that means: an unmeasured confounder would need a risk ratio of about 2.7 with both treatment and outcome, after adjustment, to cancel the effect. Doubling the risk isn't enough.

- If the upper 95% limit were 0.80, the E-value for that limit would be 1.81, which is much less reassuring.
- Overall survival in advanced cancer is a common outcome. Convert the HR to an RR first, and HR 0.60 then gives about 2.2 [20].

---

## 30. Quantitative bias analysis

- Quantitative bias analysis puts plausible values on the bias parameters (confounder prevalence and associations, misclassification, selection) and recalculates the estimate. You get the likely direction, size and uncertainty of the systematic error [22].
- Good practice is to take parameter values from outside data, show several scenarios, and be open about them [22].
- In oncology a sensible bias parameter is an unmeasured "fitness" variable: how much fitter would treated patients have to be, and how strongly would fitness have to predict survival, to explain the result?
- Negative control outcomes can reveal residual confounding or artefacts [23].
- Present QBA next to the main analysis, not tucked away afterwards.

---

## 31. A checklist for reading an RWE study in oncology

| Stage | What to look for | Bias it addresses |
|---|---|---|
| 1. Protocol | A stated target trial, aligned $t_0$, grace period handled, prevalent users excluded, HARPER and TARGET followed [1–4,29] | Immortal time, selection bias |
| 2. Variables | Stage, histology, biomarkers, performance status, comorbidity and prior lines chosen with clinical reasoning [15,16] | Residual confounding |
| 3. Balance and overlap | Weighted SMDs below 0.1, score overlap shown, weight tails reported [14,19] | Measured confounding |
| 4. Time-varying issues | Response and toxicity handled as time-varying or by landmark, g-methods if confounders respond to treatment [5,8,12,28] | Guarantee-time bias, time-varying confounding |
| 5. Unmeasured confounding | Benchmark against any available RCT, negative controls, E-values (point and limit), QBA [20–23,29–31] | Unmeasured confounding |

---

## 32. Take-home points

- Credible RWE starts with the design: a stated target trial, with time zero, eligibility and assignment lined up [1,2].
- Immortal time bias can manufacture a benefit. The metformin and cancer literature, and every "responders live longer" analysis, are the reminders [27,28]. A time-dependent analysis, a landmark or a sequential trial design prevents it.
- Propensity score methods deal with measured confounding. Check balance and overlap, and choose an estimand that matches the clinical question [14,17,19].
- Unmeasured confounding, above all fitness, is still the main threat left. Benchmark against randomised evidence when it exists (beta-carotene, SEER-Medicare), test with negative controls, and quantify with E-values and QBA [20,22,23,29–31].
- Machine learning may estimate the nuisance models better, but it doesn't replace the identification assumptions.
- TARGET and HARPER let readers check what was actually done [3,4].
---
<!-- _class: refs -->
## References (1/3)

1. Hernán MA, Robins JM. Using big data to emulate a target trial when a randomized trial is not available. *Am J Epidemiol* 2016;183:758–64. doi:10.1093/aje/kwv254
2. Hernán MA, Sauer BC, Hernández-Díaz S, Platt R, Shrier I. Specifying a target trial prevents immortal time bias and other self-inflicted injuries in observational analyses. *J Clin Epidemiol* 2016;79:70–5. doi:10.1016/j.jclinepi.2016.04.014
3. Cashin AG, Hansford HJ, Hernán MA, et al. Transparent reporting of observational studies emulating a target trial: the TARGET statement. *JAMA* 2025;334:1084–93. doi:10.1001/jama.2025.13350 (also *BMJ* 2025;390:e087179)
4. Wang SV, Pottegård A, Crown W, et al. HARmonized Protocol Template to Enhance Reproducibility of hypothesis evaluating real-world evidence studies on treatment effects (HARPER): a good practices report of a joint ISPE/ISPOR task force. *Pharmacoepidemiol Drug Saf* 2023;32:44–55. doi:10.1002/pds.5507
5. Suissa S. Immortal time bias in pharmacoepidemiology. *Am J Epidemiol* 2008;167:492–9. doi:10.1093/aje/kwm324
6. Yang G, et al. Illustrating the structures of bias from immortal time using directed acyclic graphs. *Int J Epidemiol* (2025); preprint arXiv:2312.06155.
7. Karim ME, Gustafson P, Petkau J, Tremlett H. Comparison of statistical approaches for dealing with immortal time bias in drug effectiveness studies. *Am J Epidemiol* 2016;184:325–35. doi:10.1093/aje/kwv445
8. Anderson JR, Cain KC, Gelber RD. Analysis of survival by tumor response. *J Clin Oncol* 1983;1:710–9. doi:10.1200/JCO.1983.1.11.710
9. Mi X, Hammill BG, Curtis LH, Lai EC-C, Setoguchi S. Use of the landmark method to address immortal person-time bias in comparative effectiveness research: a simulation study. *Stat Med* 2016;35:4824–36. doi:10.1002/sim.7019
10. García-Albéniz X, Hsu J, Hernán MA. The value of explicitly emulating a target trial when using real world evidence: an application to colorectal cancer screening. *Eur J Epidemiol* 2017;32. doi:10.1007/s10654-017-0287-2
11. Danaei G, Rodríguez LAG, Cantero OF, Logan R, Hernán MA. Observational data for comparative effectiveness research: an emulation of randomised trials of statins and primary prevention of coronary heart disease. *Stat Methods Med Res* 2013;22:70–96. doi:10.1177/0962280211403603
12. Robins JM, Hernán MA, Brumback B. Marginal structural models and causal inference in epidemiology. *Epidemiology* 2000;11:550–60. doi:10.1097/00001648-200009000-00011

---

<!-- _class: refs -->
## References (2/3)

13. Rosenbaum PR, Rubin DB. The central role of the propensity score in observational studies for causal effects. *Biometrika* 1983;70:41–55. doi:10.1093/biomet/70.1.41
14. Austin PC. An introduction to propensity score methods for reducing the effects of confounding in observational studies. *Multivariate Behav Res* 2011;46:399–424. doi:10.1080/00273171.2011.568786
15. Brookhart MA, Schneeweiss S, Rothman KJ, Glynn RJ, Avorn J, Stürmer T. Variable selection for propensity score models. *Am J Epidemiol* 2006;163:1149–56. doi:10.1093/aje/kwj149
16. Westreich D, Cole SR, Funk MJ, Brookhart MA, Stürmer T. The role of the c-statistic in variable selection for propensity score models. *Pharmacoepidemiol Drug Saf* 2011;20. doi:10.1002/pds.2074
17. Li F, Morgan KL, Zaslavsky AM. Balancing covariates via propensity score weighting. *J Am Stat Assoc* 2018;113:390–400. doi:10.1080/01621459.2016.1260466
18. Li F, Thomas LE, Li F. Addressing extreme propensity scores via the overlap weights. *Am J Epidemiol* 2019;188:250–7. doi:10.1093/aje/kwy201
19. Stürmer T, Webster-Clark M, Lund JL, et al. Propensity score weighting and trimming strategies for reducing variance and bias of treatment effect estimates: a simulation study. *Am J Epidemiol* 2021;190:1659–70. doi:10.1093/aje/kwab041
20. VanderWeele TJ, Ding P. Sensitivity analysis in observational research: introducing the E-value. *Ann Intern Med* 2017;167:268–74. doi:10.7326/M16-2607
21. VanderWeele TJ, Mathur MB. Commentary: developing best-practice guidelines for the reporting of E-values. *Int J Epidemiol* 2020;49:1495–7. doi:10.1093/ije/dyaa094
22. Lash TL, Fox MP, MacLehose RF, Maldonado G, McCandless LC, Greenland S. Good practices for quantitative bias analysis. *Int J Epidemiol* 2014;43:1969–85. doi:10.1093/ije/dyu149
23. Lipsitch M, Tchetgen Tchetgen E, Cohen T. Negative controls: a tool for detecting confounding and bias in observational studies. *Epidemiology* 2010;21:383–8. doi:10.1097/EDE.0b013e3181d61eeb
24. Cheng C, Li F, Thomas LE, Li FF. Addressing extreme propensity scores in estimating counterfactual survival functions via the overlap weights. *Am J Epidemiol* 2022;191:1140–51. doi:10.1093/aje/kwac043

---

<!-- _class: refs -->
## References (3/3)

25. Jackson LA, Jackson ML, Nelson JC, Neuzil KM, Weiss NS. Evidence of bias in estimates of influenza vaccine effectiveness in seniors. *Int J Epidemiol* 2006;35:337–44. doi:10.1093/ije/dyi274
26. Dormuth CR, Patrick AR, Shrank WH, et al. Statin adherence and risk of accidents: a cautionary tale. *Circulation* 2009;119:2051–7. doi:10.1161/CIRCULATIONAHA.108.824151
27. Suissa S, Azoulay L. Metformin and the risk of cancer: time-related biases in observational studies. *Diabetes Care* 2012;35:2665–73. doi:10.2337/dc12-0788
28. Giobbie-Hurder A, Gelber RD, Regan MM. Challenges of guarantee-time bias. *J Clin Oncol* 2013;31:2963–9. doi:10.1200/JCO.2013.49.5283
29. Petito LC, García-Albéniz X, Logan RW, et al. Estimates of overall survival in patients with cancer receiving different treatment regimens: emulating hypothetical target trials in the SEER–Medicare linked database. *JAMA Netw Open* 2020;3(3):e200452. doi:10.1001/jamanetworkopen.2020.0452
30. The Alpha-Tocopherol, Beta Carotene Cancer Prevention Study Group. The effect of vitamin E and beta carotene on the incidence of lung cancer and other cancers in male smokers. *N Engl J Med* 1994;330:1029–35. doi:10.1056/NEJM199404143301501
31. Omenn GS, Goodman GE, Thornquist MD, et al. Effects of a combination of beta carotene and vitamin A on lung cancer and cardiovascular disease. *N Engl J Med* 1996;334:1150–5. doi:10.1056/NEJM199605023341802

<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true, theme: 'base', securityLevel: 'loose' });
</script>
