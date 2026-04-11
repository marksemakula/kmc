import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data - replace with real API call later
const mockBlogPosts = [
  {
    id: 5,
    slug: "clinical-management-of-postpartum-haemorrhage-in-uganda",
    title: "Clinical Management of Postpartum Haemorrhage in Uganda: Prevention, Emergency Response, and Maternal Safety",
    excerpt: "Postpartum haemorrhage remains a leading cause of maternal death in Uganda. Dr. Ariaka Denis outlines the warning signs, emergency response, investigations, and pregnancy guidance that help save mothers’ lives.",
    date: "April 11, 2026",
    image: "/images/blog/dr-ariaka-denis.jpg",
    category: "Maternal Health",
    author: "Dr. Ariaka Denis, MBChB",
    content: `**By Dr. Ariaka Denis, MBChB**
*General Practitioner, Keyawell Medical Center, Uganda*
*April 2026*

---


Postpartum haemorrhage (PPH) — defined as blood loss exceeding **500 ml within 24 hours of vaginal delivery** or **1000 ml following caesarean section** — remains the foremost direct cause of maternal mortality in Uganda. Despite national advancements in emergency obstetric care, PPH continues to claim the lives of approximately one in every fifty Ugandan women during their reproductive years.

As a general practitioner practising at Keyawell Medical Center, I have witnessed that the vast majority of PPH-related deaths are preventable through timely recognition, resource-appropriate intervention, and robust antenatal preparation. This article synthesises current evidence-based practice for Ugandan clinical settings, addressing risk stratification, actionable protocols, diagnostic imperatives, and comprehensive lifestyle modifications across the nine months of gestation.

---

## Risk Factors for Postpartum Haemorrhage

Risk factors for PPH are conventionally categorised into antenatal, intrapartum, and postpartum contributors. In Uganda, particular attention must be paid to the following.

### Antenatal Risk Factors

- **Grand multiparity** (five or more previous pregnancies), which predisposes to uterine atony.
- **Anaemia** (haemoglobin below 11 g/dL), prevalent in up to 40% of Ugandan pregnant women due to malaria, hookworm infestation, and nutritional iron deficiency.
- **Previous PPH** or retained placenta in a prior delivery.
- **Placenta praevia or accreta spectrum disorders**, where identifiable via ultrasonography.
- **Multiple gestation** (twins or higher-order multiples).
- **Polyhydramnios**.
- Maternal age **below 20** or **above 35 years**.

### Intrapartum Risk Factors

- **Prolonged or obstructed labour**, common in rural settings with delayed referral.
- **Augmented or induced labour** using oxytocin.
- **Rapid, precipitous labour** lasting less than three hours.
- **Use of magnesium sulphate** for pre-eclampsia, which can relax uterine musculature.
- **Episiotomy, operative vaginal delivery** (forceps or vacuum), or caesarean section.
- **Chorioamnionitis or intrapartum fever**.

### Postpartum Risk Factors

- **Retained placental fragments** or membranes.
- **Uterine inversion**, rare but catastrophic.
- **Genital tract lacerations** — cervical, vaginal, or perineal.
- **Coagulopathy** from abruption, amniotic fluid embolism, or severe malaria.

> **Crucial clinical note:** Up to **20% of PPH cases occur in women with no identifiable risk factors**. Consequently, all delivering women must be managed with active anticipation of haemorrhage.

---

## Emergency Protocol: What to Do

The following sequential protocol assumes a basic district-level facility with access to oxytocin, misoprostol, and intravenous fluids. For community health workers or home-birth attendants, the priority is **recognition and immediate referral**.

### First Response

1. **Call for assistance.** Mobilise the second health worker, midwife, or doctor. Designate one person to record vital signs and fluid balance.

2. **Assess haemodynamic status.** Palpate the radial pulse — tachycardia above 110 bpm suggests significant blood loss. Measure blood pressure, noting that hypotension is a late sign. Check capillary refill time; more than 2 seconds indicates shock.

3. **Commence large-bore intravenous access.** Insert two 16-gauge or 18-gauge cannulas — one in each antecubital fossa if possible.

4. **Initiate intravenous fluids.** Begin with 1 litre of Ringer's lactate or normal saline infused rapidly over 15–20 minutes. In the absence of blood products, goal-directed crystalloid resuscitation is life-saving.

5. **Administer first-line uterotonics:**
   - **Oxytocin:** 10 IU intramuscularly, or 20 units in 1 litre of IV fluid at 60 drops per minute. This is the gold standard.
   - If oxytocin is unavailable or ineffective: **Misoprostol 800 mcg sublingually** (four 200-mcg tablets). In Ugandan rural settings where refrigeration is absent, misoprostol is often the only practical option.

6. **Perform uterine massage.** Place the non-dominant hand suprapubically to brace the lower uterine segment. With the dominant hand, massage the uterine fundus in a circular, firm motion until the uterus contracts. Continue at 10-minute intervals.

7. **Empty the bladder.** Catheterise the patient where possible. A distended bladder displaces the uterus and prevents effective contraction.

8. **Examine the placenta and membranes.** Inspect for completeness. If retention is suspected, attempt controlled cord traction once — never pull forcibly without uterine contraction.

9. **Perform a systematic genital tract inspection.** Using a vaginal speculum or sterile gloves, examine the cervix, vaginal walls, and perineum for lacerations requiring suturing.

### If Bleeding Continues

- **Bimanual uterine compression.** Insert one fist into the anterior vaginal fornix while the abdominal hand compresses the uterine fundus against the fist. Maintain for up to 20 minutes.
- **Administer tranexamic acid:** 1 gram IV over 10 minutes, repeated once after 30 minutes if bleeding persists. This antifibrinolytic is most effective when given within three hours of delivery.
- **Refer for surgical intervention** if capacity permits — options include intrauterine balloon tamponade (a condom on a Foley catheter is a practical low-resource alternative), uterine artery ligation, or emergency hysterectomy.
- **Arrange emergency blood transfusion.** Cross-match four units of whole blood. In resource-limited settings, consider walking donor programmes or family replacement donors.

---

## Critical Errors to Avoid

In the urgency of PPH management, certain well-intentioned actions can worsen outcomes. The following are strictly discouraged:

1. **Do not delay diagnosis by waiting for measured blood loss.** Visual estimation is notoriously inaccurate. Suspect PPH if the patient reports dizziness, if bed linens are soaked, or if the uterus feels boggy — even before formal measurement.

2. **Do not perform manual removal of the placenta without adequate analgesia or anaesthesia.** Forcing removal through a contracted cervix can cause uterine inversion or perforation. If removal is necessary, administer ketamine (0.5–1 mg/kg IV) or refer immediately.

3. **Do not administer ergometrine to hypertensive women.** This can precipitate a catastrophic cerebrovascular accident. In Uganda, where pre-eclampsia is common, always check blood pressure before giving intramuscular ergometrine.

4. **Do not pack the uterine cavity with gauze as a primary intervention.** Packing masks ongoing bleeding and may conceal retained products. If used at all — only as a last resort — remove it after 12–24 hours under antibiotic cover.

5. **Do not delay referral while waiting for IV access or fluids.** If your facility lacks surgical capacity, administer intramuscular misoprostol (800 mcg) and tranexamic acid (1 g IV or orally), then transfer immediately. The scoop-and-run approach saves lives.

6. **Do not neglect documentation.** Record vital signs every 15 minutes, fluid and drug administration times, and estimated blood loss. This is essential for handover at referral centres.

---

## Investigations

In the acute setting of PPH, investigations guide resuscitation and identify underlying causes. However, they must **never delay immediate clinical action**.

### Immediate Investigations

- **Haemoglobin or haematocrit:** A baseline value is helpful, but a normal result in early PPH does not exclude significant bleeding — haemodilution takes hours.
- **Clotting assessment:** Observe a venous blood sample in a plain red-top tube. Failure to clot within 7–10 minutes suggests coagulopathy.
- **Blood group and cross-match:** Essential for transfusion readiness. If cross-matching is unavailable, request O-negative or type-specific whole blood.

### After Stabilisation

- **Full blood count**, repeated at 6 and 24 hours to track haemoglobin decline.
- **Coagulation profile:** Prothrombin time, activated partial thromboplastin time, and fibrinogen level — a fibrinogen below 200 mg/dL is highly concerning.
- **Renal function tests** to assess shock-related kidney injury.
- **Point-of-care ultrasound** to rule out retained products of conception, intra-abdominal free fluid, or uterine rupture.

### For Recurrent or Unexplained PPH

- **Thyroid function tests** — occult hyperthyroidism can cause uterine atony.
- **Von Willebrand factor assay** — inherited bleeding disorders may first present in the postpartum period.

---

## Warning Signs to Recognise

All pregnant women in Uganda should be taught to recognise PPH warning signs before discharge. These signs apply to the first 24 hours (primary PPH) and up to six weeks postpartum (secondary PPH).

### Signs of Primary PPH (first 24 hours)

- **Visible bleeding:** Soaking more than one pad every 15 minutes, or passage of clots larger than an egg.
- **Systemic symptoms:** Dizziness on standing, breathlessness, cold extremities, palpitations, or a feeling of impending doom.
- **Uterine findings:** A boggy or soft uterus — like a wet sponge — rather than firm and contracted.
- **Tachycardia:** Heart rate persistently above 110 beats per minute at rest.
- **Hypotension:** Systolic blood pressure below 90 mmHg — a late sign indicating 30–40% blood loss.

### Signs of Secondary PPH (24 hours to 6 weeks)

- Persistent or renewed bleeding requiring pad changes every 1–2 hours.
- Foul-smelling lochia, suggesting endometritis or retained products.
- Fever above 38.5 degrees Celsius.
- Lower abdominal pain disproportionate to normal afterpains.

> **Community warning:** In Ugandan rural households where women may deliver at home, families should be instructed that any postpartum woman who cannot stand without fainting, who looks pale inside her lower eyelids, or whose breathing becomes rapid (above 25 breaths per minute) must be taken to the nearest health centre immediately — by any available means of transport.

---

## Lifestyle Guidance Throughout Pregnancy

Prevention of PPH begins long before labour. The following lifestyle recommendations, tailored to the Ugandan context, reduce risk through optimised maternal nutrition, infection control, and birth preparedness.

### First Trimester (Weeks 1–12)

- **Iron and folic acid supplementation:** 60 mg elemental iron with 400 mcg folic acid daily. This reduces anaemia — the single most important modifiable risk factor for PPH. In areas with high hookworm prevalence, a single 400 mg dose of albendazole after the first trimester is recommended.
- **Malaria prevention:** Begin sleeping under an insecticide-treated net immediately. Intermittent preventive treatment with sulfadoxine-pyrimethamine is given from 13 weeks.
- **Nutritional foundation:** Eat iron-rich foods daily — dark green leafy vegetables (nakati, dodo), small dried fish (mukene), beans, lentils, and fortified porridge. Pair with vitamin C sources such as lemon, orange, or fresh tomato to enhance iron absorption. Avoid taking iron with tea or coffee, as tannins block absorption.
- **Disclose bleeding history:** Report any personal or family history of easy bruising, prolonged bleeding after tooth extraction, or previous postpartum haemorrhage to your midwife or doctor.

### Second Trimester (Weeks 13–26)

- **Attend all focused antenatal care visits.** The Ugandan Ministry of Health recommends at least eight contacts. These include haemoglobin testing, blood pressure monitoring, and ultrasound for placental localisation.
- **Optimise haemoglobin above 11 g/dL.** If anaemia persists at 7–10.9 g/dL, increase iron to 120 mg daily. For severe anaemia below 7 g/dL, consider intravenous iron or blood transfusion before term.
- **Prepare a birth plan.** Discuss with your family: which facility you will deliver at; transport arrangements; and a blood donor identified from your family. Delivery at a health centre level II or above is strongly preferred — home birth with a traditional birth attendant carries a significantly higher PPH mortality risk.
- **Physical activity:** Moderate walking for 30 minutes daily, five times per week, improves uterine muscle tone and cardiovascular reserve. Avoid heavy lifting above 10 kg and prolonged standing after 20 weeks.

### Third Trimester (Weeks 27–40)

- **Complete the malaria prevention schedule.** Four doses of sulfadoxine-pyrimethamine if possible, spaced one month apart. Malaria in the third trimester causes maternal anaemia and placental insufficiency, both of which potentiate PPH.
- **Maintain iron adherence.** Continue supplementation until delivery and for three months postpartum. If constipation develops, manage it with increased fluids, dietary fibre (matoke, sweet potato, pumpkin), and a stool softener such as docusate — do not stop the iron.
- **Know your danger signs.** Vaginal bleeding after 28 weeks, severe headache, visual disturbances, abdominal pain, and reduced foetal movements all require immediate evaluation.
- **Carry a birth preparedness kit when labour begins.** This should include clean gloves, a clean razor blade for cord cutting, two clean cloths, a plastic sheet, and — most critically — a heat-stable misoprostol 600 mcg tablet obtained from your antenatal clinic. Administer this immediately after the baby is born if you deliver outside a facility, before the placenta is delivered.
- **Arrange a birth companion.** A family member who knows your transport plan, emergency contacts, and the location of the nearest health facility. This companion should be familiar with the four steps of active management of the third stage of labour: uterotonic administration, cord clamping, controlled cord traction, and uterine massage.

### Postpartum Period (First 6 Weeks)

- **Continue iron for 3 months.** Postpartum anaemia impairs lactation, increases infection risk, and reduces maternal energy for newborn care.
- **Monitor lochia progression.** Normal lochia changes from red (days 1–3) to pink or brown (days 4–10) to white or yellow (days 11–42). Any return to bright red bleeding after day 7 warrants immediate review.
- **Rest, but mobilise.** Bed rest beyond the first 24 hours increases thrombosis risk. Walk gently from day 2. Avoid strenuous work — pounding posho, carrying water, digging — for six weeks.
- **Breastfeed on demand.** Frequent breastfeeding releases endogenous oxytocin, which maintains uterine contraction and reduces PPH risk in the first postpartum week.
- **Attend the 6-week postnatal visit.** This is often neglected in Uganda but is essential for contraception initiation — which helps reduce grand multiparity — and for addressing unresolved anaemia or infection.

---

## Conclusion

Postpartum haemorrhage is neither a random tragedy nor an inevitable consequence of childbirth — it is a predictable, largely preventable, and treatable obstetric emergency. In Uganda, where health system gaps are real but not insurmountable, the greatest improvements in PPH outcomes will come from three parallel efforts: empowering pregnant women with knowledge and birth plans; equipping every health centre with oxytocin, misoprostol, and tranexamic acid; and training every skilled birth attendant — from the specialist in Kampala to the enrolled midwife in Karamoja — in the disciplined, sequential protocol for PPH management.

As a general practitioner working in a Ugandan district facility, I have seen lives saved by a single dose of misoprostol administered in a taxi on the way to hospital. I have also seen lives lost because a woman's anaemia went untreated for nine months. The message is clear: prevention begins in the first trimester, preparedness enables survival, and prompt, protocol-driven action in the golden hour after delivery is the difference between a mother returning home to her children and a family left bereaved.

**Dr. Ariaka Denis, MBChB**
General Practitioner
Keyawell Medical Center, Uganda
*April 2026*

---

*This article provides general clinical guidance for healthcare workers and pregnant women in the Ugandan context. It does not replace individual clinical judgement, facility-specific protocols, or in-person medical consultation. Always consult a qualified health professional for personal medical advice.*`,
  },
  {
    id: 1,
    slug: "advancements-in-telemedicine",
    title: "Advancements in Telemedicine",
    excerpt: "Explore how telemedicine is revolutionizing patient care and accessibility.",
    date: "May 15, 2024",
    image: "/images/blog/telemedicine.jpg",
    category: "Technology",
    content: "Full article content would go here..."
  },
  {
    id: 4,
    slug: "On-HIV-and-MDR-TB-Dr-Sajja-Kenneth",
    title: "HIV and MDR‑TB in Uganda: What You Need to Know",
    excerpt: "Uganda has made remarkable progress against HIV, yet 1.5 million people still live with the virus and MDR‑TB cases are rising. Dr. Sajja Kenneth explains the current landscape, treatment options, and how to live and support loved ones through the journey.",
    date: "April 8, 2026",
    image: "/images/blog/dr-sajja-kenneth.jpg",
    category: "Health",
    author: "Dr. Sajja Kenneth, MSc. Micro-Biology (MUK), MBCHB (MUST)",
    content: `**By Dr. Sajja Kenneth, MSc. Micro-Biology (MUK), MBCHB (MUST)**

For many Ugandans, an HIV diagnosis no longer carries the weight it once did. We have made remarkable progress—national prevalence has dropped from 18% at the height of the epidemic to 4.9% today, and 98% of Ugandans are now HIV‑negative [1][2]. Yet the fight is far from over. An estimated 1.5 million people in our country are living with HIV, and every year approximately 38,000 new infections occur alongside more than 20,000 AIDS‑related deaths [3].

Alongside this chronic epidemic, a more aggressive threat has been quietly growing: multidrug‑resistant tuberculosis (MDR‑TB). Unlike standard TB, which can be cured in six months, MDR‑TB is caused by strains resistant to the two most powerful first‑line drugs, isoniazid and rifampicin. Treating it requires longer, more expensive regimens with lower success rates. This blog draws on the latest research to explain what HIV and MDR‑TB mean for Uganda today, how to navigate treatment, and—most importantly—how to live fully and support loved ones through the journey.

---

## The Current Landscape: Progress That Cannot Hide the Gaps

Uganda has embraced the global 95‑95‑95 targets: 95% of people living with HIV should know their status, 95% of those should be on antiretroviral therapy (ART), and 95% of those on ART should have suppressed viral loads. While we have made strides, we are not yet there. The 2025 National HIV Estimates Report shows prevalence at 4.9% (down from 5.1% in 2023), but the absolute numbers remain high [4].

Tuberculosis is equally pervasive. Uganda ranks among the top 30 high‑TB‑HIV burden countries in the world, with an estimated TB prevalence of 198 cases per 100,000 population. Roughly 96,000 TB cases are notified each year, and about one‑third of TB patients are also HIV‑positive [5][6].

MDR‑TB, meanwhile, is rising. Nationwide, MDR‑TB affects about 1.6% of newly diagnosed TB patients and 12% of those who have been treated before. The number of MDR/RR‑TB cases jumped from 643 in 2023 to 819 in 2024—a 47% to 69% increase [7]. In the Kigezi sub‑region, for instance, 25 MDR‑TB cases were already recorded in the first nine months of 2025, compared to 20 for all of 2023 [8]. These figures are not abstract statistics; they represent real people, families, and communities.

---

## The Challenge of MDR‑TB: What Makes It Different?

Multidrug‑resistant TB is defined as resistance to at least isoniazid and rifampicin—the backbone of standard TB treatment. It develops most often when TB treatment is incomplete, when doses are incorrect, or when patients are re‑treated after a relapse or treatment failure. In Uganda, MDR‑TB prevalence among new TB cases ranges from 0.4% in some East African countries to 4.4% in Uganda, and among recurrent cases it can be as high as 17.7% [9].

Because MDR‑TB is harder to treat, the consequences are severe. A large study of MDR‑TB patients treated at Ugandan regional referral hospitals found that overall treatment success was **68.7%**—meaning nearly one in three patients did not achieve a successful outcome, including high mortality rates [10]. The same study identified a strong association between low body weight at treatment initiation and poorer outcomes, underscoring the importance of nutritional support [11].

---

## The HIV‑MDR‑TB Syndemic: A Dangerous Pairing

HIV and MDR‑TB do not merely coexist; they amplify each other. Approximately **40% of all TB patients in Uganda are co‑infected with HIV** [12]. Among MDR‑TB patients specifically, the HIV co‑infection rate is even higher: one study estimated **46.7%** of MDR‑TB patients in Uganda also live with HIV [13].

People living with HIV (PLHIV) have a higher risk of developing MDR‑TB compared to those without HIV. Research from rural eastern Uganda found that among PLHIV, retreatment TB was a particularly strong risk factor, with an adjusted odds ratio of 6.39—meaning a more than sixfold increased risk of MDR‑TB if you have been treated for TB before [14]. The presence of HIV also worsens treatment outcomes for MDR‑TB, making close integration of HIV and TB services essential.

---

## Treatment and Care: What Works in Uganda

### HIV: Antiretroviral Therapy (ART) and Prevention

Uganda follows the WHO "Universal Test and Treat" policy, meaning every person diagnosed with HIV is eligible for ART regardless of CD4 count [15]. ART is available free of charge at public health facilities, including district hospitals, health centres, and through community‑based models such as community client‑led ART delivery (CCLAD). Viral suppression rates are high in well‑resourced settings—for example, one project reported 96% viral suppression among clients on ART—but national coverage still falls short of the 95‑95‑95 targets [16].

In addition to ART, tuberculosis preventive treatment (TPT) is strongly recommended for all PLHIV who do not have active TB. Uganda has adopted shorter TPT regimens (e.g., 3HP, a three‑month course of isoniazid and rifapentine) to improve uptake and completion [17][18].

### MDR‑TB: Long, Intensive, but Curable

Treatment for MDR‑TB is more demanding. Patients are referred to specialised MDR‑TB treatment centres, where they receive second‑line drugs for 9–20 months depending on the regimen. Directly observed therapy (DOT) is the standard of care to ensure adherence. However, recent research shows that **peripheral health facilities achieve better adherence than central hospitals**: in one study, 26.5% of patients receiving DOT at peripheral facilities had good adherence compared to 0% at the central initiating facility [19].

Patients themselves prefer **community‑based DOT** delivered by community health workers (CHWs) at home, supplemented by travel vouchers for monthly clinic visits [20]. This patient‑centred approach not only improves adherence but also reduces out‑of‑pocket costs and stigma.

### Integrated HIV‑MDR‑TB Care

Given the high rates of HIV‑MDR‑TB co‑infection, the Ministry of Health has integrated services. TB patients are routinely tested for HIV, and PLHIV are screened for TB using rapid molecular tests like **GeneXpert MTB/RIF**. In many facilities, patients receive both ART and MDR‑TB medications at the same visit, with close monitoring for drug‑drug interactions (e.g., rifampicin and certain antiretrovirals).

---

## Living with HIV and MDR‑TB: Practical Guidance

### 1. Planning for Treatment

- **Get tested promptly.** If you have symptoms of TB (cough >2 weeks, night sweats, weight loss) or have been exposed to a known TB case, seek GeneXpert testing. For PLHIV, annual TB screening is recommended.
- **Start ART immediately** if you test HIV‑positive, regardless of CD4 count. Early ART reduces your risk of developing active TB and other opportunistic infections.
- **Complete the full course.** MDR‑TB treatment is long, but stopping early can lead to even more resistant forms (XDR‑TB). Use pill organisers, phone alarms, or enlist a treatment supporter to help.

### 2. Taking Care of Loved Ones

- **Support, do not stigmatise.** A person living with HIV or MDR‑TB needs emotional and practical support. Avoid isolating them; instead, accompany them to clinic visits, help with meals, and listen without judgment.
- **Practice infection control.** For MDR‑TB, ensure the patient sleeps in a well‑ventilated room, covers their mouth when coughing, and wears a mask in shared spaces until sputum conversion is confirmed. Household contacts should be screened for TB.
- **Encourage adherence.** Research shows that patients with household contacts screened for MDR‑TB are much more likely to have good adherence (24.1% vs. 3.6% for those without contact screening) [21].

### 3. What to Do (and What Not to Do)

**Do:**

- Eat a balanced diet. Only 30% of TB patients in Kampala have adequate dietary diversity [22]. Good nutrition improves treatment outcomes.
- Take medications exactly as prescribed. Do not miss doses.
- Inform your healthcare provider of any side effects (nausea, hearing loss, jaundice, etc.) immediately. Many side effects can be managed.
- Join a support group. Organisations like the Infectious Diseases Institute (IDI), Mengo Hospital HIV Clinic, and Baylor Foundation Uganda offer counselling, peer support, and adherence clubs [23][24].
- Practice safe sex and disclose your HIV status to partners to prevent transmission.

**Do not:**

- Do not share your TB medications with others.
- Do not stop treatment early because you "feel better."
- Do not self‑medicate with herbal remedies without telling your doctor; they may interact with ART or TB drugs.
- Do not hide your diagnosis. Stigma thrives in silence. Speaking openly with trusted people reduces isolation.

### 4. Mental Health Matters

People living with HIV and TB experience higher rates of depression, anxiety, and HIV‑associated neurocognitive disorders. The Ministry of Health is actively integrating mental health services into HIV and TB clinics across the country, including in northern Uganda [25][26]. If you feel persistently sad, hopeless, or overwhelmed, ask your clinician for a mental health referral.

---

## Conclusion: A Future We Can Shape Together

Uganda has shown that we can bend the curve of an epidemic. HIV prevalence is down, new infections are falling, and more people than ever are on treatment. But the rise of MDR‑TB is a stark reminder that our gains are fragile. We need to strengthen diagnostic capacity (including **mobile TB diagnostics** and **computer‑aided detection**), scale up community‑based DOT, and ensure that every PLHIV receives TPT [27].

For those living with both HIV and MDR‑TB, the road is long, but it is not impassable. With rigorous adherence, strong social support, and a healthcare system that treats you with dignity, successful treatment is achievable. Let us commit to ending stigma, investing in integrated care, and never leaving anyone behind.

**Remember:** You are not alone. Uganda's healthcare workers, peer supporters, and fellow patients are walking this path with you. Reach out, speak up, and take the next dose—one day at a time.

*Dr. Sajja Kenneth is a medical doctor and microbiologist based in Uganda. He is passionate about infectious disease epidemiology and patient‑centred care.*`
  }
];

export const fetchBlogPosts = createAsyncThunk(
  'blog/fetchPosts',
  async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockBlogPosts;
    // For real API: 
    // const response = await axios.get('YOUR_REAL_API_ENDPOINT');
    // return response.data;
  }
);

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: [],
    currentPost: null,
    status: 'idle',
    error: null
  },
  reducers: {
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { setCurrentPost } = blogSlice.actions;
export default blogSlice.reducer;