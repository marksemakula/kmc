import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock data - replace with real API call later
const mockBlogPosts = [
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
    id: 2,
    slug: "healthy-living-tips",
    title: "Healthy Living Tips",
    excerpt: "Simple daily habits that can significantly improve your overall health.",
    date: "April 28, 2024",
    image: "/images/blog/health-tips.jpg",
    category: "Wellness",
    content: "Full article content would go here..."
  },
  {
    id: 3,
    slug: "new-pediatric-wing-opening",
    title: "New Pediatric Wing Opening",
    excerpt: "Our new state-of-the-art pediatric facility is now accepting patients.",
    date: "April 10, 2024",
    image: "/images/blog/pediatric-wing.jpg",
    category: "News",
    content: "Full article content would go here..."
  },
  {
    id: 4,
    slug: "On-HIV-and-MDR-TB-Dr-Sajja-Kenneth",
    title: "HIV and MDR‑TB in Uganda: What You Need to Know",
    excerpt: "Uganda has made remarkable progress against HIV, yet 1.5 million people still live with the virus and MDR‑TB cases are rising. Dr. Sajja Kenneth explains the current landscape, treatment options, and how to live and support loved ones through the journey.",
    date: "April 8, 2026",
    image: "/images/blog/health-tips.avif",
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