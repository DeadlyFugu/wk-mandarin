import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.util.ArrayList;

public class ExtractReadingFromKanjidic2 {
    // make numbered tones into proper unicode tone mark boys
    public static String pinyinNumberToUnicode(String numberedPinyin) {
        int len = numberedPinyin.length();

        // determine tone
        int tone = Integer.parseInt(numberedPinyin.substring(len - 1));

        // find last vowel
        int lastVowel = len - 2;
        while (!"aeiouv".contains(""+numberedPinyin.charAt(lastVowel))) lastVowel--;

        if (lastVowel > 0) {
            char currentVowel = numberedPinyin.charAt(lastVowel);
            char previousVowel = numberedPinyin.charAt(lastVowel - 1);
            if ((currentVowel == 'u' && previousVowel == 'o') || previousVowel == 'a' || previousVowel == 'e') lastVowel--;
        }

        // replace all v with ü
        numberedPinyin = numberedPinyin.replace("v", "ü");

        // determine accented vowels
        char vowel = numberedPinyin.charAt(lastVowel);
        String vowelSet = null;
        switch (vowel) {
            case 'a': vowelSet = "āáǎàa"; break;
            case 'e': vowelSet = "ēéěèe"; break;
            case 'i': vowelSet = "īíǐìi"; break;
            case 'o': vowelSet = "ōóǒòo"; break;
            case 'u': vowelSet = "ūúǔùu"; break;
            case 'ü': vowelSet = "ǖǘǚǜü"; break;
        }

        char[] chars = numberedPinyin.toCharArray();
        chars[lastVowel] = vowelSet.charAt(tone-1);
        return String.valueOf(chars).substring(0, len - 1);
    }

    public static void main(String[] args) throws Exception {
        // read xml
        File kanjidic2 = new File("/Users/matt/Downloads/kanjidic2.xml");
        DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
        DocumentBuilder db = dbf.newDocumentBuilder();
        Document doc = db.parse(kanjidic2);

        // iterate through kanji
        NodeList characters = doc.getElementsByTagName("character");
        for (int i = 0; i < characters.getLength(); i++) {
            Node kanjiNode = characters.item(i);
            if (kanjiNode.getNodeType() == Node.ELEMENT_NODE) {
                Element kanji = (Element) kanjiNode;
                NodeList literals = kanji.getElementsByTagName("literal");
                if (literals.getLength() == 0) continue;
                String name = literals.item(0).getTextContent();

                // exclude uncommon kanji
                NodeList misc = kanji.getElementsByTagName("misc");
                if (misc.getLength() == 0) continue;
                NodeList jlptLevel = ((Element) misc.item(0)).getElementsByTagName("jlpt");
                if (jlptLevel.getLength() == 0) continue;

                // grab pinyin readings
                ArrayList<String> pinyinReadings = new ArrayList<>();
                NodeList reading_meaning = kanji.getElementsByTagName("reading_meaning");
                if (reading_meaning.getLength() > 0) {
                    Element rmgroup = ((Element) ((Element) reading_meaning.item(0)).getElementsByTagName("rmgroup").item(0));
                    NodeList readings = rmgroup.getElementsByTagName("reading");
                    for (int j = 0; j < readings.getLength(); j++) {
                        Node reading = readings.item(j);
                        if (reading.getAttributes().getNamedItem("r_type").getNodeValue().equals("pinyin")) {
                            pinyinReadings.add(reading.getTextContent());
                        }
                    }
                }

                // print readings
                if (pinyinReadings.size() > 0) {
                    System.out.print("\"" + name + "\": \"");
                    System.out.print(pinyinNumberToUnicode(pinyinReadings.get(0)));
                    for (int j = 1; j < pinyinReadings.size(); j++) {
                        System.out.print(", " + pinyinNumberToUnicode(pinyinReadings.get(j)));
                    }
                    System.out.print("\", ");
                }
            } else {
                System.out.println(kanjiNode.getNodeType());
            }
        }
    }
}
