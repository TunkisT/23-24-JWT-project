Susikuriame dvi lenteles:

   ++ users (id, email, password, reg_timestamp);
  ++  articles (id, date, title, content).

Susikuriame NodeJS serverį su:

   ++ Auth: POST register (išsaugo vartotojo duomenis į users lentelę);
   ++ Auth: POST login (patikrina vartotojo duomenis ir grąžina tokeną);
   ++ Content: GET articles (tik registruotiems vartotojams);

Susikuriame Front-end‘o puslapius:

    register.html (forma - sukuria vartotoją arba išmeta klaidą).
    login.html (forma – grąžina token'ą ir išsaugo į localstorage (arba kaip cookie). Kitu atveju išmeta klaidą).
    index.html – išmeta visus straipsnius auth vartotojams. Jei vartotojas ne auth – jį nukreipia į login.html.

Taip pat nepamirštame patikrinti ir validuoti visų priimamų įvesčių. Tiek backend'e, tiek frontend'e.
