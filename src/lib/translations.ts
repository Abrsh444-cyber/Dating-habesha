import { Language, Religion, Region, RelationshipIntent, ReportReason } from '../types';

export const translations = {
  en: {
    appName: 'Habesha Connect',
    appSubtitle: 'Culturally Respectful Dating & Serious Matchmaking',
    tagline: 'Connecting Ethiopians at Home & Across the Diaspora',
    languageToggle: 'አማርኛ',
    login: 'Log In',
    signup: 'Create Account',
    logout: 'Log Out',
    getStarted: 'Get Started',
    
    // Navigation
    navDiscover: 'Discover',
    navGrid: 'Browse All',
    navMatches: 'Matches & Chat',
    navProfile: 'My Profile',
    navSafety: 'Safety & Guidelines',
    navAdmin: 'Moderation Admin',
    
    // Auth & Guidelines
    authTitle: 'Welcome to Habesha Connect',
    authSubtitle: 'A safe, respectful platform built for meaningful Ethiopian relationships.',
    phoneOrEmail: 'Phone Number or Email',
    password: 'Password',
    googleSignIn: 'Continue with Google',
    ageVerificationLabel: 'I confirm I am 18 years of age or older.',
    ageVerificationError: 'You must be at least 18 years old to join Habesha Connect.',
    termsAgreement: 'By continuing, you agree to our Community Guidelines and Safety Policy.',
    confirmOtp: 'Enter Verification Code',
    otpSentTo: 'We sent a 6-digit confirmation code to',
    verifyCode: 'Verify & Continue',
    
    // Onboarding
    stepBasic: 'Basic Info',
    stepIntent: 'Intent & Career',
    stepFaith: 'Faith & Cultural Identity',
    stepBioPhotos: 'Photos & Bio',
    stepVerification: 'Photo Verification',
    
    fullName: 'Full Name',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    female: 'Female',
    male: 'Male',
    city: 'City / Location',
    country: 'Country',
    
    // Intent
    relationshipIntent: 'Relationship Intent (Required)',
    intentMarriage: 'Marriage-Minded (ለጋብቻ የተዘጋጀ)',
    intentSerious: 'Serious Relationship (እውነተኛ ግንኙነት)',
    intentCasual: 'Friendship & Dating (ጓደኝነት/ቀጠሮ)',
    intentDesc: 'Being transparent about your relationship goal builds trust with fellow members.',
    
    profession: 'Profession / Job Title',
    education: 'Education Level',
    languagesSpoken: 'Languages Spoken',
    
    // Faith & Region
    religionLabel: 'Religious Identity',
    religionOrthodox: 'Ethiopian Orthodox Tewahedo (ኦርቶዶክስ ተዋሕዶ)',
    religionIslam: 'Islam / Muslim (እስልምና)',
    religionProtestant: 'Protestant / P\'ente (ፕሮቴስታንት)',
    religionCatholic: 'Catholic (ካቶሊክ)',
    religionTraditional: 'Traditional / Cultural',
    religionOther: 'Other / Spiritual',
    religionPreferNot: 'Prefer not to say',
    
    regionLabel: 'Ethnicity / Regional Identity (Optional)',
    regionDisclaimer: 'This field is entirely optional. It helps members find shared cultural roots and is never used to exclude anyone.',
    regionAmhara: 'Amhara (አማራ)',
    regionOromo: 'Oromo (ኦሮሞ)',
    regionTigray: 'Tigray (ትግራይ)',
    regionGurage: 'Gurage (ጉራጌ)',
    regionSidama: 'Sidama (ሲዳማ)',
    regionSomali: 'Somali (ሱማሌ)',
    regionAfar: 'Afar (ዓፋር)',
    regionSNNPR: 'Southern Regions / SNNPR',
    regionDiasporaUSA: 'Diaspora — North America',
    regionDiasporaEurope: 'Diaspora — Europe',
    regionDiasporaMiddleEast: 'Diaspora — Middle East',
    regionDiasporaOther: 'Diaspora — Other Regions',
    regionUnspecified: 'Skip / Prefer not to say',
    
    // Photos & Verification
    bioLabel: 'Bio & About You',
    bioPlaceholder: 'Share a bit about your background, family values, hobbies, and what you are looking for in a partner...',
    photosLabel: 'Upload Photos (Min 2, Max 6)',
    photosNotice: 'All photos are checked before your profile becomes active to ensure authenticity and keep the community safe.',
    
    selfieVerificationTitle: 'Take a Quick Selfie Verification',
    selfieVerificationDesc: 'To prevent fake profiles and bots, take a quick photo of yourself. Our automated system matches your selfie to your profile pictures.',
    takeSelfie: 'Upload Verification Selfie',
    verificationPending: 'Verification Pending Review',
    verificationSuccess: 'Profile Verified ✓',
    
    // Discovery & Filters
    filterTitle: 'Filter Profiles',
    filterAge: 'Age Range',
    filterReligion: 'Religion',
    filterIntent: 'Relationship Intent',
    filterRegion: 'Regional Identity (Self-disclosed)',
    filterVerifiedOnly: 'Show Verified Profiles Only',
    applyFilters: 'Apply Filters',
    resetFilters: 'Reset Filters',
    allReligions: 'All Faiths',
    allIntents: 'All Relationship Intents',
    allRegions: 'All Regions',
    
    // Actions
    like: 'Like',
    pass: 'Pass',
    matched: 'It\'s a Match! 🎉',
    matchedDesc: 'You and %NAME% liked each other. You can now send a respectful message.',
    startChat: 'Start Chatting',
    keepSwiping: 'Keep Browsing',
    noMoreProfiles: 'No More Profiles Available',
    noMoreProfilesDesc: 'Try adjusting your filters or expand your search distance to discover more members.',
    
    // Chat & Messages
    chatTitle: 'Messages',
    typeMessage: 'Type a respectful message...',
    send: 'Send',
    noMessagesYet: 'No messages yet. Send a friendly greeting to break the ice!',
    screenshotWarning: '🔒 Safety First: Screenshots are discouraged. Please protect fellow members\' privacy.',
    safetyNotice: 'Never transfer money or share banking details with anyone online. Meet in public places with friends or family aware.',
    reportAndBlock: 'Report / Block',
    sendImage: 'Share Photo',
    
    // Report & Block Modal
    reportTitle: 'Report or Block Member',
    reportSubtitle: 'Help us maintain a safe, respectful Habesha community.',
    reportReasonLabel: 'Reason for reporting:',
    reasonFake: 'Fake profile or stolen photos',
    reasonInappropriate: 'Inappropriate photos or bio',
    reasonUnderage: 'User appears to be under 18',
    reasonSpam: 'Spam, bot, or requesting money',
    reasonHarassment: 'Rude, offensive, or harassment',
    reasonOther: 'Other community violation',
    reportDetailsLabel: 'Additional details (optional):',
    blockUserCheckbox: 'Block this member from contacting or seeing me',
    submitReport: 'Submit Safety Report',
    reportSubmitted: 'Thank you. Our moderation team will review this report promptly.',
    
    // Admin & Moderation
    adminTitle: 'Moderation & Safety Dashboard',
    pendingVerifications: 'Pending Photo Verifications',
    pendingReports: 'Reported Content & Profiles',
    statsOverview: 'Community Safety Overview',
    approve: 'Approve Profile',
    reject: 'Reject & Request New Photo',
    dismissReport: 'Dismiss Report',
    actionBan: 'Terminate Account',
    actionWarn: 'Send Warning',
    
    // Guidelines & Policy
    guidelinesTitle: 'Habesha Connect Safety & Community Guidelines',
    rule1Title: '1. Respect & Cultural Sensitivity',
    rule1Body: 'We celebrate Ethiopian heritage, diversity, and traditions. Harassment, hate speech, or disrespect based on faith, ethnicity, or gender will result in immediate ban.',
    rule2Title: '2. Mandatory Age Requirement (18+)',
    rule2Body: 'You must be at least 18 years old. Falsifying your age is strictly prohibited and leads to instant account deletion.',
    rule3Title: '3. Authentic Identity & Photo Verification',
    rule3Body: 'All members must pass selfie photo verification. Stock photos, celebrities, or group photos as primary profile pictures are rejected.',
    rule4Title: '4. Financial Safety — Zero Tolerance for Scams',
    rule4Body: 'Never send money, airtime, or financial gifts to anyone you meet online. Report any user asking for financial assistance immediately.',
    
    verifiedBadge: 'Verified ✓',
    optionalTag: 'Optional',
    requiredTag: 'Required',
  },
  am: {
    appName: 'ሀበሻ Connect',
    appSubtitle: 'ባህላዊ እሴትን የጠበቀ የፍቅር እና የትዳር አጋር ማገናኛ',
    tagline: 'በሀገር ውስጥና በውጭ ሀገር የሚኖሩ ኢትዮጵያውያንን የሚያገናኝ',
    languageToggle: 'English',
    login: 'ግልባጭ ግባ (Log In)',
    signup: 'አዲስ መለያ ፍጠር (Sign Up)',
    logout: 'ውጣ (Log Out)',
    getStarted: 'ጀምር',
    
    // Navigation
    navDiscover: 'መፈለጊያ',
    navGrid: 'ሁሉንም እይ',
    navMatches: 'ተጣማሪዎች እና ውይይት',
    navProfile: 'የግል ገጼ',
    navSafety: 'ደህንነት እና ሕጎች',
    navAdmin: 'የቁጥጥር ገጽ',
    
    // Auth & Guidelines
    authTitle: 'እንኳን ወደ ሀበሻ Connect በደህና መጡ',
    authSubtitle: 'ለቆንጆ፣ ለአክብሮት የተሞላ እና እውነተኛ የኢትዮጵያውያን ግንኙነት የተሰራ ደህንነቱ የተጠበቀ መድረክ።',
    phoneOrEmail: 'ስልክ ቁጥር ወይም ኢሜይል',
    password: 'የይለፍ ቃል',
    googleSignIn: 'በ Google ቀጥል',
    ageVerificationLabel: 'እድሜዬ 18 ዓመትና ከዚያ በላይ መሆኑን አረጋግጣለሁ።',
    ageVerificationError: 'ሀበሻ Connect ለመጠቀም ቢያንስ 18 ዓመት መሆን አለብዎት።',
    termsAgreement: 'በመቀጠልዎ የማህበረሰብ ሕጎቻችንን እና የደህንነት ፖሊሲያችንን ተቀብለዋል።',
    confirmOtp: 'የማረጋገጫ ኮድ ያስገቡ',
    otpSentTo: 'ባለ 6 አሃዝ ማረጋገጫ ኮድ ወደዚህ ልከናል፡',
    verifyCode: 'አረጋግጥና ቀጥል',
    
    // Onboarding
    stepBasic: 'መሠረታዊ መረጃ',
    stepIntent: 'የግንኙነት ዓላማ እና ሥራ',
    stepFaith: 'እምነት እና ባህላዊ ማንነት',
    stepBioPhotos: 'ፎቶዎች እና መግለጫ',
    stepVerification: 'የፎቶ ማረጋገጫ',
    
    fullName: 'ሙሉ ስም',
    dateOfBirth: 'የትውልድ ቀን',
    gender: 'ፆታ',
    female: 'ሴት',
    male: 'ወንድ',
    city: 'ከተማ / የሚኖሩበት ቦታ',
    country: 'ሀገር',
    
    // Intent
    relationshipIntent: 'የግንኙነት ዓላማ (ግዴታ)',
    intentMarriage: 'ለጋብቻ የተዘጋጀ (Marriage-Minded)',
    intentSerious: 'እውነተኛ ግንኙነት (Serious Relationship)',
    intentCasual: 'ጓደኝነት/ቀጠሮ (Friendship/Dating)',
    intentDesc: 'ስለ ግንኙነት ዓላማዎ ግልጽ መሆንዎ ከሌሎች አባላት ጋር እምነት ይፈጥራል።',
    
    profession: 'የሥራ መስክ / ሙያ',
    education: 'የትምህርት ደረጃ',
    languagesSpoken: 'የሚናገሩዋቸው ቋንቋዎች',
    
    // Faith & Region
    religionLabel: 'የእምነት ማንነት',
    religionOrthodox: 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ',
    religionIslam: 'እስልምና (ሙስሊም)',
    religionProtestant: 'ፕሮቴስታንት',
    religionCatholic: 'ካቶሊክ',
    religionTraditional: 'ባህላዊ / ባህልን የጠበቀ',
    religionOther: 'ሌላ',
    religionPreferNot: 'መግለጽ አልፈልግም',
    
    regionLabel: 'ብሔር / የክልል ማንነት (በምርጫ)',
    regionDisclaimer: 'ይህ መረጃ ሙሉ በሙሉ በምርጫ የሚሞላ ነው። ባህላዊ ትስስርን ለመፈለግ የሚረዳ እንጂ ማንንም ለማግለል አይጠቀምም።',
    regionAmhara: 'አማራ',
    regionOromo: 'ኦሮሞ',
    regionTigray: 'ትግራይ',
    regionGurage: 'ጉራጌ',
    regionSidama: 'ሲዳማ',
    regionSomali: 'ሱማሌ',
    regionAfar: 'ዓፋር',
    regionSNNPR: 'የደቡብ ክልሎች',
    regionDiasporaUSA: 'ዳያስፖራ — ሰሜን አሜሪካ',
    regionDiasporaEurope: 'ዳያስፖራ — አውሮፓ',
    regionDiasporaMiddleEast: 'ዳያስፖራ — መካከለኛው ምስራቅ',
    regionDiasporaOther: 'ዳያስፖራ — ሌላ ክፍለ ሀገር',
    regionUnspecified: 'ዘልል / መግለጽ አልፈልግም',
    
    // Photos & Verification
    bioLabel: 'ስለ እርሶ የሚገልጽ ጽሑፍ',
    bioPlaceholder: 'ስለ ማንነትዎ፣ ስለ ቤተሰብዎ እሴቶች፣ ስለ መዝናኛዎ እና በትዳር/ፍቅር አጋርዎ ውስጥ ስለሚፈልጉት ነገር ያብራሩ...',
    photosLabel: 'ፎቶዎችን ይጫኑ (ቢያንስ 2፣ ቢበዛ 6)',
    photosNotice: 'መለያዎ ከመከፈቱ በፊት ሁሉም ፎቶዎች በደህንነት ቡድናችን ይገመገማሉ።',
    
    selfieVerificationTitle: 'የፊት ማረጋገጫ ፎቶ ያንሱ (Selfie)',
    selfieVerificationDesc: 'የሐሰት መለያዎችን ለመከላከል ፈጣን ሴልፊ ፎቶ ያንሱ። ሲስተሙ ከፎቶዎችዎ ጋር ያነጻጽረዋል።',
    takeSelfie: 'የማረጋገጫ ሴልፊ ጫን',
    verificationPending: 'ማረጋገጫ በግምገማ ላይ ነው',
    verificationSuccess: 'ተረጋግጧል ✓',
    
    // Discovery & Filters
    filterTitle: 'አባላትን ማጣሪያ',
    filterAge: 'የዕድሜ ክልል',
    filterReligion: 'እምነት',
    filterIntent: 'የግንኙነት ዓላማ',
    filterRegion: 'የብሔር/ክልል ማንነት',
    filterVerifiedOnly: 'የተረጋገጡ አባላትን ብቻ አሳይ',
    applyFilters: 'አጣራ',
    resetFilters: 'ወደነበረበት መልስ',
    allReligions: 'ሁሉም እምነቶች',
    allIntents: 'ሁሉም የግንኙነት ዓላማዎች',
    allRegions: 'ሁሉም ክልሎች',
    
    // Actions
    like: 'ወደድኩት',
    pass: 'ለፍ',
    matched: 'ተጣመራችሁ! 🎉',
    matchedDesc: 'እርሶ እና %NAME% እርስ በእርስ ተወዳድዳችኋል። አሁን ውይይት መጀመር ትችላላችሁ።',
    startChat: 'ውይይት ጀምር',
    keepSwiping: 'ሌሎችን እይ',
    noMoreProfiles: 'ሌላ አባል አልተገኘም',
    noMoreProfilesDesc: 'ተጨማሪ አባላትን ለማግኘት ማጣሪያዎችን ወይም የርቀት ክልልዎን ያስፉ።',
    
    // Chat & Messages
    chatTitle: 'መልዕክቶች',
    typeMessage: 'በአክብሮት መልዕክት ይፃፉ...',
    send: 'ላክ',
    noMessagesYet: 'እስካሁን ምንም መልዕክት የለም። ሰላምታ በመላክ ይጀምሩ!',
    screenshotWarning: '🔒 ደህንነት፡ የውይይት ስክሪንሾት ማንሳት የተከለከለ ነው። የሌሎችን ግላዊነት ይጠብቁ።',
    safetyNotice: 'በኢንተርኔት ለተወዋወቁት ሰው በጭራሽ ገንዘብ አይላኩ። ሲገናኙ በሕዝብ ቦታ ይሁን።',
    reportAndBlock: 'ጥቆማ / እገዳ',
    sendImage: 'ፎቶ ላክ',
    
    // Report & Block Modal
    reportTitle: 'አባልን ይጠቁሙ ወይም ያግዱ',
    reportSubtitle: 'ደህንነቱ የተጠበቀ የማህበረሰብ አካባቢ እንድንፈጥር ይርዱን።',
    reportReasonLabel: 'የጥቆማው ምክንያት፡',
    reasonFake: 'የሐሰት መለያ ወይም የተሰረቀ ፎቶ',
    reasonInappropriate: 'ተappropriate ያልሆነ ፎቶ ወይም ጽሑፍ',
    reasonUnderage: 'ዕድሜው ከ18 ዓመት በታች ይመስላል',
    reasonSpam: 'ስፓም/ቦት ወይም ገንዘብ የሚጠይቅ',
    reasonHarassment: 'ያልተገባ ባህሪ ወይም ስድብ',
    reasonOther: 'ሌላ የሕግ መጣስ',
    reportDetailsLabel: 'ተጨማሪ ዝርዝር (በምርጫ)፡',
    blockUserCheckbox: 'ይህ አባል እንዳያገኘኝ እና እንዳያየኝ እገደው',
    submitReport: 'ጥቆማውን ላክ',
    reportSubmitted: 'እናመሰግናለን። የቁጥጥር ቡድናችን ጥቆማውን በፍጥነት ይመረምራል።',
    
    // Admin & Moderation
    adminTitle: 'የደህንነት እና የቁጥጥር ገጽ',
    pendingVerifications: 'በግምገማ ላይ ያሉ የፎቶ ማረጋገጫዎች',
    pendingReports: 'የቀረቡ ጥቆማዎች',
    statsOverview: 'የማህበረሰብ ደህንነት አጠቃላይ ሁኔታ',
    approve: 'ፈቅድ (Approve)',
    reject: 'ውድቅ አድርግ',
    dismissReport: 'ጥቆማውን ሰርዝ',
    actionBan: 'መለያውን ዝጋ (Ban)',
    actionWarn: 'ማስጠንቀቂያ ላክ',
    
    // Guidelines & Policy
    guidelinesTitle: 'የሀበሻ Connect የደህንነት እና የማህበረሰብ ሕጎች',
    rule1Title: '1. አክብሮት እና ባህላዊ እሴት',
    rule1Body: 'የኢትዮጵያን ባህል፣ ብዝሃነት እና እሴቶች እናከብራለን። በእምነት፣ በብሔር ወይም በፆታ ላይ የተመሰረተ ማንኛውም ስድብ መለያውን ያዘጋል።',
    rule2Title: '2. የዕድሜ መስፈርት (18+)',
    rule2Body: 'ቢያንስ 18 ዓመት መሆን አለብዎት። የሐሰት ዕድሜ መጠቀም መለያውን ወዲያውኑ ያስዘጋል።',
    rule3Title: '3. እውነተኛ ማንነት እና የፎቶ ማረጋገጫ',
    rule3Body: 'ሁሉም አባላት የሴልፊ ማረጋገጫ ማለፍ አለባቸው። የሌሎች ሰዎችን ወይም የታዋቂ ሰዎችን ፎቶ መጠቀም አይቻልም።',
    rule4Title: '4. የፋይናንስ ደህንነት — ለገንዘብ ጥያቄ ዜሮ ትዕግስት',
    rule4Body: 'በመስመር ላይ ለተወዋወቁት ሰው በጭራሽ ገንዘብ ወይም ካርድ አይላኩ። ገንዘብ የሚጠይቅን ሰው ወዲያውኑ ይጠቁሙ።',
    
    verifiedBadge: 'ተረጋግጧል ✓',
    optionalTag: 'በምርጫ',
    requiredTag: 'ግዴታ',
  },
};

export function getTranslation(lang: Language, key: keyof typeof translations['en'], params?: Record<string, string>): string {
  let text = translations[lang]?.[key] || translations['en']?.[key] || key;
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      text = text.replace(`%${k}%`, v);
    });
  }
  return text;
}
