---
marp: true
theme: sgpgi-scholar
size: 16:9
title: Data Types and How AI Learns
paginate: true
footer: 'Data Types and How AI Learns (2026) · CC BY-NC 4.0'
---

<!-- _class: titlepage -->
<!-- _paginate: false -->

<div class="topleft">

<img src="assets/New Logo_0.png" alt="Chavi" height="120">
<img src="assets/draw_logo.png" alt="DRAW" height="120">
<img src="assets/sathi_logo.png" alt="Sathi" height="120">

</div>

# Data Types and How AI Learns


### Dr Santam Chakraborty
#### Senior Consultant, Department of Radiation Oncology
###### Tata Medical Center, India

---

<!-- footer: '' -->

# Disclosures

- Extramural funding from:
    - ASCO
    - ICMR
    - DBT
    - Lady Tata Memorial Trust
- Co-developer of DRAW - Deep Learning for Radiotherapy Autosegmentation Workflow (https://draw.chavi.ai)

---

<!-- footer: 'Data Types and How AI Learns (2026) · CC BY-NC 4.0' -->

<!-- _class: transition -->
<!-- _paginate: false -->

<!-- _class: cool-list -->

# Outline

1. *What is Data?*
1. *Types of Data*
1. *How AI Learns*

---

<!-- _class: transition -->
<!-- _paginate: false -->



# What is Data?

Data are information that is collected and analyzed to make decisions or draw conclusions.

Any thing can be data but in medical context typically information is sourced from medical notes, images, laboratory test results, procedure details etc. - **HeathCare Data**

---

<!-- _class: image-focus -->
<!-- _paginate: false -->

# Types of Data

![w:800 center](assets/data_types.svg)


---
# Why Measurement scale matters

| Scale | Data Order | Ranking | Differences | True Zero | Mathematics |
|----|----|----|----|---|---|
|Nominal|No|No|Meaningless|Absent| Non-mathematical | 
|Ordinal|Yes|No|Meaningless| Absent | Non-mathematical |
|Interval|Yes|Yes|Meaningful| Absent | Except Division |
|Ratio|Yes| Yes |Meaningful| Present | All Operations|

> Note a true zero means that zero denotes abscence.

---

# How we handle this in AI Training ?

| Scale Type | Mean | Sorting | Handling Procedure | 
|---|---|---| -- |
| Nominal | X | Useless | One-hot encoding |
| Ordinal | X | As per order | Label or Target Mean Encoding |
| Interval | Yes | Min-Max | Multiple Methods |
| Ratio | Yes | Min-Max | Multiple Methods |

> Important: Without proper encoding, many ML models will not work correctly.
---
<!-- _class: image-focus -->
# Sources of Healthcare Data

![w:800 center](assets/sources_of_medical_data.png)

> Source: By Brysonwong01 - Own work, CC BY-SA 4.0, https://commons.wikimedia.org/w/index.php?curid=89546994.


---

# What is special about Healthcare Data?

1. **Sensitivity**: Medical data contains sensitive personal and health information that requires strict privacy and security measures.
2. **Complexity**: Medical data can be complex and unstructured, making it difficult to analyze and interpret.
3. **Regulation**: Medical data is subject to strict regulations and guidelines, such as HIPAA and GDPR, which govern how it can be collected, stored, and used.
4. **Interpretation**: Medical data requires specialized knowledge and expertise to interpret and analyze effectively.
5. **Ethics**: Medical data raises ethical considerations, such as patient consent and data sharing, that must be carefully considered.


---
# What are the Practical Implications?

1. Data can be **Big** and **Small** at the same time- For example Imaging Data
2. Data will be **Longitudinal** - Collected over a period of Time
3. Data will be **Incomplete** - Missing values, missing visits, missing tests
4. Data will be stored in **Proprietary** systems - Not easily accessible
5. Data will be influenced by **Unknown** factors - As we are not fully aware of the complete biological processes involved
6. Data will have **Bias** - Systematic process related to data collection that influences interpretation



---
<!-- _class: image-focus -->

# Biases and their Classification

![w:800 center](assets/classification_of_bias.png)

> Source: A taxonomy of biases: progress report https://catalogofbias.org/2020/02/11/a-taxonomy-of-biases-progress-report/.


---
<!-- _class: image-focus -->

# Steps in AI Learning ?

![w:1000](assets/learning_steps.svg)

> Note that modelling is probably the EASIEST part of the chain !

---

