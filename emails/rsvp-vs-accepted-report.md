# RSVP vs Accepted Hackers Cross-Reference

Source files:

- `emails/BearHacks2026-RSVPs.csv` (RSVP form submissions)
- `emails/accepted_hackers.csv` (official accepted hacker list)

Matching is done by lowercased, trimmed email address first, then by
normalized `First Name + Last Name` for anyone not found by email.

## Totals

| Metric | Count |
| --- | --- |
| Total RSVPs (raw rows) | 250 |
| Unique RSVP emails (1 duplicate collapsed) | 249 |
| Total accepted hackers | 312 |
| In both lists (by email match) | 239 |
| RSVP'd but not in accepted (by email) | 10 |
| Accepted but did not RSVP (by email AND by name) | 65 |

### Real RSVPs (RSVP + on accepted list)

**248 of the 249 unique RSVPs correspond to an actually-accepted hacker.**

| Match type | Count |
| --- | --- |
| Matched to accepted hacker by email | 239 |
| Matched by exact first+last name (different email used for RSVP) | 8 |
| Matched by name token overlap (Nitin Shankar Madhu ≈ Nitin Madhu) | 1 |
| **Real RSVPs total** | **248** |
| Truly unmatched (Fares Tamraz only) | 1 |

## RSVP'd but NOT in `accepted_hackers.csv` by email (10)

### Same person, different email used for RSVP (8)

These people are accepted, they just submitted their RSVP from a different
email address than the one we accepted them under. Use the **RSVP email**
going forward — that's the inbox they're actually checking.

| Name | RSVP email | Accepted email |
| --- | --- | --- |
| Mustafa Tamer | `tamermus854@gmail.com` | `mjtamer@outlook.com` |
| Nicholas McClure | `nicholasjmcclure@yahoo.ca` | `nmcclure0330@gmail.com` |
| Jolie Nguyen | `jolievy.04@gmail.com` | `joliejello@gmail.com` |
| Nermin Ghabiel | `nermin.ghabiel@mail.utoronto.ca` | `nerminghabiel@gmail.com` |
| Sabeen Khan | `khan802@sheridancollege.ca` | `sabeenk2006@gmail.com` |
| Artur Sharipov | `sharipov@sheridancollege.ca` | `arturka0505@gmail.com` |
| Reese Chong | `r25chong@uwaterloo.ca` | `dev.reese.chong@gmail.com` |
| Amara Hussain | `maraunicornjk@gmail.com` | `4amahus@gmail.com` |

### Probably the same person — last name differs slightly (1)

| RSVP | Accepted |
| --- | --- |
| Nitin Shankar Madhu `<nmadhu@umich.edu>` | Nitin Madhu `<nitinshankarmadhu@gmail.com>` |

Worth a quick manual confirmation before sending.

### Truly unmatched — RSVP'd but never formally accepted (1)

- **Fares Tamraz** `<fares-tamraz@hotmail.com>` — no email match and no name
  match in the accepted list. Possibly RSVP'd as a teammate before
  acceptance, but never made it onto the official accepted roster. Needs a
  decision: accept + send, or ignore.

## Accepted but did NOT RSVP (65)

These 65 hackers were accepted but have no RSVP record (checked both by
email and by normalized first+last name). If we send the hacker-acceptances
email from the RSVPs list, **these hackers will not receive it**.

| # | Name | Accepted email |
| --- | --- | --- |
| 1 | Joseph Jatou | jatoujoseph@gmail.com |
| 2 | Jenny Nguyen | jenny132007@gmail.com |
| 3 | Ameer Khan | ameeralikhan1245@hotmail.com |
| 4 | Akash Nagabhirava | akash.nagabhirava@mail.utoronto.ca |
| 5 | Darshan Prajapati | mr.darshan2919@gmail.com |
| 6 | Harmanpreet Singh | preetsinghharman27@gmail.com |
| 7 | Cemal Durak | cenesdurak@gmail.com |
| 8 | Vishnu Sai | vishnu.sai@mail.utoronto.ca |
| 9 | Bryan Maristanez | michaelbryan857@gmail.com |
| 10 | Daniel Mena | menadan@sheridancollege.ca |
| 11 | Abe Kuk | abe.kuk@mail.utoronto.ca |
| 12 | Lifeng Yin | lifeng.yin.07@gmail.com |
| 13 | Likhitha Koppula | likhithakoppula10@gmail.com |
| 14 | Seeron Sivashankar | seeronsiva6@gmail.com |
| 15 | Ahmad Al-Jabi | ahm.aljabi@gmail.com |
| 16 | Tarun Rawat | rawattar@msu.edu |
| 17 | Santiago Bernal | bernsan@sheridancollege.com |
| 18 | Mfon Udoh | mfonezekel@gmail.com |
| 19 | Carolyn Carter | carolynmuskoka@gmail.com |
| 20 | Maha Siddiqi | mahasiddiqi58@gmail.com |
| 21 | Sulaiman Syed | sulaimansyed0016@gmail.com |
| 22 | Mark Bertrand | mbert619@gmail.com |
| 23 | Cris Huynh | khangpicasso@gmail.com |
| 24 | Nicholas Williams | pizzafeet70@gmail.com |
| 25 | Amy Xiong | amyxiongg@gmail.com |
| 26 | Wangsicong Wei | weiwa@sheridancollege.ca |
| 27 | Anish Paleja | anipaleja@gmail.com |
| 28 | Phineas Truong | phineas.truong@mail.utoronto.ca |
| 29 | Liam Nicol | liamnicol535393@gmail.com |
| 30 | Areeba Minhaj | minhajareebax@gmail.com |
| 31 | Artem Kotliar | kotliar.artem@gmail.com |
| 32 | Iskander Yelemes | iskander102005@gmail.com |
| 33 | Jeremy Tica | jeremytica@gmail.com |
| 34 | Gianni Marchione | gianni_m_marchione@hotmail.com |
| 35 | Evan Tao | tao.evan.pi@gmail.com |
| 36 | Rizmari Arrogante | ricemarii@gmail.com |
| 37 | Awsaf Fida Mahmud | fidaawsaf@gmail.com |
| 38 | Siddhartha Pahari | siddhartha.pahari@gmail.com |
| 39 | Daphne Nguyen | diepanhnguyen1809@gmail.com |
| 40 | Rostyslav Shcherbyk | shcherbykrostyslav@gmail.com |
| 41 | Daniel Liu | danielwliudwl@gmail.com |
| 42 | Joao Lucas Queiroz de Almeida | joaolucasqa2304@gmail.com |
| 43 | Hashim Bukhtiar | hashbukhtiar@gmail.com |
| 44 | Umar Zaman | zamanu@sheridancollege.ca |
| 45 | Mekaeel Malik | mekaeel.r.malik@gmail.com |
| 46 | Rodoshi Mondal | rodoshi.mondal@mail.utoronto.ca |
| 47 | Chuka Ezeoke | cezeoke@umich.edu |
| 48 | Hira Ahmad | ahmadhira8@gmail.com |
| 49 | Piyush Yadav | ypiyush14yadav@gmail.com |
| 50 | Jaran Khalid | jarankhalid2@gmail.com |
| 51 | Adem Cehajic | ademc1191@gmail.com |
| 52 | Aman Shah | amanashishshah@gmail.com |
| 53 | Nathan Nguyen | nathan-nguyen@outlook.com |
| 54 | Navya Madaan | navyamadaan21@gmail.com |
| 55 | Mohammed Elshrief | elshriefmoh@gmail.com |
| 56 | Emily Ibanez | ibanezemily@outlook.com |
| 57 | Sang Hyun Yoon | yoonsa@sheridancollege.ca |
| 58 | Justin Mui | j2mui@uwaterloo.ca |
| 59 | Kabir Arora | arora7kabir@gmail.com |
| 60 | Aizah Sadiq | aizahsaba@gmail.com |
| 61 | Shawn Li | lishawn100@uwaterloo.ca |
| 62 | Syed Aashir Alam | aashiralam06@gmail.com |
| 63 | Nitin Madhu | nitinshankarmadhu@gmail.com (likely same as RSVP'd `nmadhu@umich.edu` — see above) |
| 64 | Brownson Omotoye | omotoyebrownson@yahoo.com |
| 65 | Paarth Sharma | paarths376@gmail.com |

## Decisions needed

1. **Fares Tamraz** — accept + send, or skip?
2. **Nitin Madhu / Nitin Shankar Madhu** — confirm same person, pick one email.
3. **65 accepted-but-no-RSVP hackers** — do they get the hacker-acceptances
   email anyway (separate send from `accepted_hackers.csv`), or is silence
   intentional until they RSVP?

## Campaign source change

The `acceptances` campaign was switched to a normalized, deduped RSVPs CSV
so the hacker-acceptances email will go to the 249 unique RSVP addresses
rather than the 312 accepted-hacker addresses.

- New recipient source: `emails/rsvped_hackers.csv` (249 rows, `FirstName,LastName,EmailAddress`)
- Generator: `scripts/normalize_rsvps_csv.py` — re-run anytime
  `BearHacks2026-RSVPs.csv` changes.
- Config change: `core/email.py` → `csv_filename="rsvped_hackers.csv"` for
  the `acceptances` campaign.
