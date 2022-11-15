export async function football_standings(t, e, a, l, s, n, o, _ = !1) {
  var d = new Headers();
  d.append("x-rapidapi-key", l), d.append("x-rapidapi-host", s);
  var r = { method: "GET", headers: d, redirect: "follow" };
  let g = "https://v3.football.api-sports.io/";
  "v3.football.api-sports.io" != s &&
    (g = "https://api-football-v1.p.rapidapi.com/v3/");
  let w = "?";
  null !== t && "" !== t && ("?" !== w && (w += "&"), (w += "league=" + t)),
    null !== a && "" !== a && ("?" !== w && (w += "&"), (w += "team=" + a)),
    null !== e && "" !== e && ("?" !== w && (w += "&"), (w += "season=" + e));
  try {
    const t = await fetch(g + "standings" + w, r);
    let e = await t.json(),
      a = document.getElementById("wg-api-football-standings");
    _ && (a = document.getElementById("wb-football-modal-data"));
    let l = "";
    if ("true" === n) {
      for (const t in e.errors)
        console.log(e.errors[t]),
          (l += `\n                    <div class="wg_no_data">${e.errors[t]}</div>\n                `);
      return a.classList.remove("wg_loader"), (a.innerHTML = l), !1;
    }
    if (0 === e.results)
      return (
        (l +=
          '\n                <div class="wg_no_data">No Standings Available</div>\n            '),
        a.classList.remove("wg_loader"),
        (a.innerHTML = l),
        !1
      );
    l +=
      '\n            <table class="wg-table" id="wg-football-standings">\n                <thead>\n                </thead>\n        ';
    let s = "",
      d = "";
    for (const t in e.response) {
      let a = e.response[t];
      (l += `\n                <tr>\n                    <td class="wg_header" colspan="11"><img class="wg_flag" src="${a.league.flag}" loading="lazy" onerror='this.style.display="none"'> ${a.league.country}: ${a.league.name}</td>\n                </tr>\n            `),
        (s = a.league.name);
      for (const a in e.response[t])
        for (const n in e.response[t][a].standings)
          for (const _ in e.response[t][a].standings[n]) {
            let r = e.response[t][a].standings[n][_];
            if (d !== r.group) {
              let t = "";
              r.group != s && (t = r.group),
                (l += `\n                                <tr>\n                                    <td class="wg_header" colspan="2">${t}</td>\n                                    <td class="wg_header wg_text_center wg_tooltip wg_tooltip_left" data-text="Matches Played">MP</td>\n                                    <td class="wg_header wg_text_center wg_tooltip wg_tooltip_left" data-text="Win">W</td>\n                                    <td class="wg_header wg_text_center wg_tooltip wg_tooltip_left" data-text="Draw">D</td>\n                                    <td class="wg_header wg_text_center wg_tooltip wg_tooltip_left" data-text="Lose">L</td>\n                                    <td class="wg_header wg_text_center wg_tooltip wg_tooltip_left wg_hide_xxs" data-text="Goals For : Goals Against">G</td>\n                                    <td class="wg_header wg_text_center wg_hide_xs">+/-</td>\n                                    <td class="wg_header wg_text_center wg_tooltip wg_tooltip_left" data-text="Points">P</td>\n                                    <td class="wg_header wg_text_center wg_hide_xs"></td>\n                                    <td class="wg_header wg_text_center wg_hide_xs"></td>\n                                </tr>\n                            `),
                (d = r.group);
            }
            let g = `<img class="wg_logo" src="${r.team.logo}" loading="lazy" onerror='this.style.display="none"'> ${r.team.name}`;
            "false" === o && (g = `${r.team.name}`);
            let w = r.points;
            null === w && (w = "");
            let i = "";
            null !== r.form &&
              (i = (i = (i = (i = (i = r.form.replaceAll("WO", "W")).replaceAll(
                "LO",
                "L"
              )).replaceAll(
                "W",
                '<span class="wg_form wg_form_win">W</span>'
              )).replaceAll(
                "D",
                '<span class="wg_form wg_form_draw">D</span>'
              )).replaceAll(
                "L",
                '<span class="wg_form wg_form_lose">L</span>'
              ));
            let c = `<span class="wg_info wg_tooltip wg_tooltip_left" data-text="${r.description}">?</span>`;
            null === r.description && (c = ""),
              (l += `\n                            <tr>\n                                <td class="wg_text_center wg_bolder wg_width_20">${r.rank}</td>\n                                <td class="wg_nowrap">${g}</td>\n                                <td class="wg_text_center wg_width_20">${r.all.played}</td>\n                                <td class="wg_text_center wg_width_20">${r.all.win}</td>\n                                <td class="wg_text_center wg_width_20">${r.all.draw}</td>\n                                <td class="wg_text_center wg_width_20">${r.all.lose}</td>\n                                <td class="wg_text_center wg_width_20 wg_hide_xxs">${r.all.goals.for}:${r.all.goals.against}</td>\n                                <td class="wg_text_center wg_width_20 wg_hide_xs">${r.goalsDiff}</td>\n                                <td class="wg_text_center wg_width_20">${w}</td>\n                                <td class="wg_text_center wg_width_90 wg_hide_xs">${i}</td>\n                                <td class="wg_text_center wg_width_20 wg_hide_xs">${c}</td>\n                            </tr>\n                        `);
          }
    }
    (l += "\n            </table>\n        "),
      a.classList.remove("wg_loader"),
      (a.innerHTML = l);
  } catch (t) {
    "true" === n && console.log(t);
  }
}
