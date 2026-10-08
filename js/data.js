const plazas = [
  { id: 1, name: "Orchard Gate", highway: "Corridor A", km: 35, lanes: 6, car: 85 },
  { id: 2, name: "Lakeside Gate", highway: "Corridor A", km: 78, lanes: 8, car: 110 },
  { id: 3, name: "Riverbend Gate", highway: "Corridor A", km: 124, lanes: 6, car: 130 },
  { id: 4, name: "Eastern Gate", highway: "Corridor A", km: 170, lanes: 4, car: 95 },
  { id: 5, name: "Hillview Plaza", highway: "Corridor B", km: 22, lanes: 4, car: 70 },
  { id: 6, name: "Cedar Plaza", highway: "Corridor B", km: 66, lanes: 6, car: 120 },
  { id: 7, name: "Meadow Plaza", highway: "Corridor B", km: 118, lanes: 8, car: 150 },
  { id: 8, name: "Summit Plaza", highway: "Corridor B", km: 190, lanes: 6, car: 175 },
  { id: 9, name: "Sunrise Booth", highway: "Corridor C", km: 15, lanes: 4, car: 60 },
  { id: 10, name: "Palm Grove", highway: "Corridor C", km: 58, lanes: 6, car: 90 },
  { id: 11, name: "Harbour Gate", highway: "Corridor C", km: 102, lanes: 6, car: 105 }
];

const multiplier = { car: 1, lcv: 1.6, truck: 3.3, multi: 5.2 };

const PASS_PRICE = 3000;
const PASS_TRIPS = 200;

const problems = [
  {
    category: "Tag & Account",
    title: "My FASTag does not scan at the gate",
    what: "The reader beeps or shows an error and the barrier stays closed.",
    steps: [
      "Check the tag is stuck on the inside of the windscreen, not on the dashboard or in your hand.",
      "Make sure it is not scratched, folded or covered by a sticker or tint film.",
      "Stop and tell the toll staff. They can try a handheld reader.",
      "Afterwards ask your issuer to test or replace the tag."
    ],
    contact: "Plaza staff, then your tag issuer"
  },
  {
    category: "Tag & Account",
    title: "My tag is blocked or blacklisted",
    what: "The gate shows 'blacklisted' even though the tag is fitted.",
    steps: [
      "Tags are often blocked for low balance or incomplete KYC.",
      "Recharge and complete KYC in your issuer's app.",
      "Wait for the tag to become active, then try again.",
      "If it stays blocked, call the issuer's care number."
    ],
    contact: "Tag issuer",
    link: "balance.html",
    linkText: "Check my balance"
  },
  {
    category: "Tag & Account",
    title: "Wrong vehicle class on my tag",
    what: "You are charged the rate of a different vehicle type.",
    steps: [
      "Check the vehicle class shown in your issuer's app.",
      "Keep your RC (registration certificate) ready.",
      "Ask the issuer to correct the class or replace the tag.",
      "Raise a dispute for any extra amount already charged."
    ],
    contact: "Tag issuer"
  },
  {
    category: "Tag & Account",
    title: "I lost my tag or it was damaged",
    what: "The tag peeled off, tore or is missing.",
    steps: [
      "Never reuse a peeled-off tag. It can stop working.",
      "Block the old tag in your issuer's app.",
      "Order a replacement and keep your vehicle documents ready.",
      "Until the new tag arrives, ask about other payment options at the plaza."
    ],
    contact: "Tag issuer"
  },
  {
    category: "Payment",
    title: "Money was deducted but the barrier did not open",
    what: "You got a deduction SMS but you are still blocked.",
    steps: [
      "Do not reverse or walk away. Tell the plaza staff at once.",
      "Note the plaza name, date, time and the SMS text.",
      "Ask the staff to open the barrier manually.",
      "Raise a dispute with your issuer if the amount is wrong."
    ],
    contact: "Plaza staff, tag issuer, NHAI 1033"
  },
  {
    category: "Payment",
    title: "I was charged twice or the wrong amount",
    what: "Two deductions for one crossing, or more than the board shows.",
    steps: [
      "Keep the SMS or screenshots for every deduction.",
      "Check the vehicle class and the rate board at that plaza.",
      "Raise a dispute in the issuer's app with the proof.",
      "If it is not solved, escalate to NHAI on 1033."
    ],
    contact: "Tag issuer, NHAI 1033",
    link: "distance.html",
    linkText: "Check the expected toll"
  },
  {
    category: "Payment",
    title: "My balance ran out at the gate",
    what: "The tag shows insufficient balance and the lane is blocked.",
    steps: [
      "Recharge through the issuer's app or UPI while you wait safely.",
      "If the top-up is delayed, ask the staff what other options they allow.",
      "Next time check your balance before leaving and keep a buffer."
    ],
    contact: "Tag issuer",
    link: "balance.html",
    linkText: "Check my balance"
  },
  {
    category: "Payment",
    title: "Recharge done but balance not updated",
    what: "Money left your bank but the tag balance has not changed.",
    steps: [
      "Wait a few minutes and refresh the issuer's app.",
      "Save the transaction ID and a screenshot.",
      "Call the issuer's care number with the transaction ID.",
      "Do not recharge again until it is confirmed."
    ],
    contact: "Tag issuer or your bank"
  },
  {
    category: "At the Gate",
    title: "I entered the FASTag lane without a valid tag",
    what: "No tag, an invalid tag or a tag with no balance in a FASTag lane.",
    steps: [
      "Tell the staff. You may be asked to pay more than the normal toll.",
      "Check the current penalty rule on the official NHAI website.",
      "Get a valid tag soon so this does not happen again."
    ],
    contact: "Plaza staff, NHAI"
  },
  {
    category: "At the Gate",
    title: "There is a very long queue",
    what: "Vehicles are waiting far longer than normal.",
    steps: [
      "Stay in your lane and follow the staff instructions.",
      "Many plazas mark a yellow line about 100 m before the booth. As per NHAI guidelines a long queue beyond it may be let through. Check the current rule.",
      "Report repeated long waits with the plaza name and time to NHAI on 1033."
    ],
    contact: "Plaza manager, NHAI 1033"
  },
  {
    category: "At the Gate",
    title: "Which lane should I use?",
    what: "You are confused by the lane signs when you arrive.",
    steps: [
      "Use the FASTag lane if your tag is active and has balance.",
      "Slow down early and keep a safe gap.",
      "Heavy vehicles should follow the lane signs for their class."
    ],
    contact: "Plaza signs and staff"
  },
  {
    category: "Planning",
    title: "I don't know the toll before I start",
    what: "You only find out the total at each gate.",
    steps: [
      "Open the Trip Cost page.",
      "Choose the start plaza, end plaza and vehicle type.",
      "Read the total toll, distance and driving time.",
      "Add the fuel cost to see the full trip budget."
    ],
    contact: "TollMate",
    link: "distance.html",
    linkText: "Open Trip Cost"
  },
  {
    category: "Planning",
    title: "I travel often and pay a lot of toll",
    what: "Daily or weekly travel adds up to a big yearly amount.",
    steps: [
      "Calculate your one-trip toll on the Trip Cost page.",
      "Use the annual pass check with your trips per year.",
      "Compare the yearly cost with and without the pass.",
      "Confirm the pass rules officially before buying."
    ],
    contact: "TollMate",
    link: "distance.html#pass",
    linkText: "Open Pass Check"
  },
  {
    category: "Planning",
    title: "How many toll plazas are on my route?",
    what: "You want to know which gates and kilometre marks you will cross.",
    steps: [
      "Use the Trip Cost calculator. It lists every plaza on the route.",
      "Or search any plaza on the Plaza Finder page."
    ],
    contact: "TollMate",
    link: "plazas.html",
    linkText: "Open Plaza Finder"
  },
  {
    category: "Safety",
    title: "My vehicle broke down near the toll plaza",
    what: "Engine failure, a flat tyre or an accident close to the gate.",
    steps: [
      "Switch on the hazard lights and move to the side if you can.",
      "Call 112 in an emergency or NHAI 1033 for highway help.",
      "Stay well away from moving traffic.",
      "Place a warning triangle behind the vehicle if you have one."
    ],
    contact: "112 or NHAI 1033"
  },
  {
    category: "Safety",
    title: "Night or foggy driving near toll gates",
    what: "Poor visibility makes gates and queues dangerous.",
    steps: [
      "Slow down well before the plaza and use low-beam or fog lights.",
      "Keep extra distance from the vehicle ahead.",
      "Do not stop on the carriageway unless you must."
    ],
    contact: "Driver"
  }
];
