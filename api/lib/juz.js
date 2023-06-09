const { data: juz } = require('../../data/juz.json');
const { data: quran } = require('../../data/quran.json');

const juzData = _inputJuz => {
   const inputJuz = juz[_inputJuz - 1];

   if (!inputJuz) return null;

   const startSurah = inputJuz.start.index - 1;
   const startAyah = inputJuz.start.verse - 1;
   const endSurah = inputJuz.end.index - 1;
   const endAyah = inputJuz.end.verse;
   let juzAyah = [];

   for (let i = startSurah; i <= endSurah; i++) {
      const surah = quran[i];
      const ayahCount = surah.verses.length;
      const surahAyah = {
         number: surah.number,
         numberOfVerses: surah.numberOfVerses,
         name: surah.name,
         revelation: surah.revelation,
         tafsir: surah.tafsir,
         preBismillah: surah.preBismillah,
         verses: [],
      };

      if (i === startSurah) {
         for (let j = startAyah; j < ayahCount; j++) {
            surahAyah.verses.push(surah.verses[j]);
         }
      } else if (i === endSurah) {
         for (let j = 0; j < endAyah; j++) {
            surahAyah.verses.push(surah.verses[j]);
         }
      } else {
         surahAyah.verses = surah.verses;
      }

      juzAyah.push(surahAyah);
   }

   const data = {
      juz: _inputJuz,
      juzStartInfo: `${quran[startSurah].name.transliteration.id} - ${inputJuz.start.verse}`,
      juzEndInfo: `${quran[endSurah].name.transliteration.id} - ${inputJuz.end.verse}`,
      totalVerses: juzAyah.reduce((total, surah) => total + surah.verses.length, 0),
      dataJuz: juzAyah,
   };

   return data;
};

module.exports = juzData;
