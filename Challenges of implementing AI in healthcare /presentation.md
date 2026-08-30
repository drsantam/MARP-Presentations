---
marp: true
theme: sgpgi-scholar
size: 16:9
title: Challenges of implementing AI in healthcare
paginate: true
footer: 'Challenges of implementing AI in healthcare (2026) · CC BY-NC 4.0'
---
<!-- _class: titlepage -->
<!-- _paginate: false -->

<div class="topleft">

<img src="assets/New Logo_0.png" alt="Chavi" height="120">
<img src="assets/draw_logo.png" alt="DRAW" height="120">
<img src="assets/sathi_logo.png" alt="Sathi" height="120">

</div>

# Challenges of Implementing AI in Healthcare (& some solutions)


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

<!-- _class: image-focus -->

# Classification of Challenges

![width:600px](assets/challenges_classification.svg)

> Source : 
    Angelina Q, Begum K, Kim H-C, Tripathy S, Singhal D, Singh S. A structural analysis of AI implementation challenges in healthcare. Algorithms 2025;18:189. https://doi.org/10.3390/a18040189.
  

---

# Insufficient Data

- Modern AI algorithms require **"large"** and **diverse** data volume to learn patterns. 

> For example MINST data has 70,000 images of handwritten digits. Use to train the first generation CNNs

- Healthcare data:
    - Poor **quality**
    - Limited **representation** of population
    - **Fragmented** across institutions
    - **Secured** by Regulation
    
---

<!-- _class: split-box -->

# Insufficient Data

<div>

![width:600px](assets/image.png)

> Source : https://huggingface.co/datasets/marin-community/datashop-medical-qa/tree/main

</div>

<div class='box'>

- Currently the largest medial QA dataset on Huggingface

- Sourced from multiple sources including blogposts and podcasts !

- Has insecure files in it with viruses (picked up by Huggingface itself)

- Has been used in the MARIN project for training foundation models. 

</div>

---

<!-- _class: split-box -->

# Data Acquisition

<div class='box'>

- Medical data is generated using **"poorly"** reproducible and **"expensive"** methods. 

- **Systematic** issues are often not captured explicitly e.g. the socioeconomic status.

- Data is often acquired in **"proprietary"** formats that are not easily shareable.

- Data is often stored in **unstructured** fashion which makes information retrieval difficult.


</div>

<div>



</div>

