import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
};

export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Datenschutz&shy;erkl&auml;rung
      </h1>
      <h2 className="text-2xl font-semibold mb-4">
        1. Datenschutz auf einen Blick
      </h2>
      <h3 className="text-xl font-semibold mb-3">Allgemeine Hinweise</h3>{" "}
      <p className="mb-2">
        Die folgenden Hinweise geben einen einfachen &Uuml;berblick
        dar&uuml;ber, was mit Ihren personenbezogenen Daten passiert, wenn Sie
        diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
        denen Sie pers&ouml;nlich identifiziert werden k&ouml;nnen.
        Ausf&uuml;hrliche Informationen zum Thema Datenschutz entnehmen Sie
        unserer unter diesem Text aufgef&uuml;hrten Datenschutzerkl&auml;rung.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Datenerfassung auf dieser Website
      </h3>{" "}
      <h4 className="text-lg font-semibold mb-2">
        Wer ist verantwortlich f&uuml;r die Datenerfassung auf dieser Website?
      </h4>{" "}
      <p className="mb-2">
        Die Datenverarbeitung auf dieser Website erfolgt durch den
        Websitebetreiber. Dessen Kontaktdaten k&ouml;nnen Sie dem Abschnitt
        &bdquo;Hinweis zur Verantwortlichen Stelle&ldquo; in dieser
        Datenschutzerkl&auml;rung entnehmen.
      </p>{" "}
      <h4 className="text-lg font-semibold mb-2">
        Wie erfassen wir Ihre Daten?
      </h4>{" "}
      <p className="mb-2">
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
        mitteilen. Hierbei kann es sich z.&nbsp;B. um Daten handeln, die Sie in
        ein Kontaktformular eingeben.
      </p>{" "}
      <p className="mb-2">
        Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch
        der Website durch unsere IT-Systeme erfasst. Das sind vor allem
        technische Daten (z.&nbsp;B. Internetbrowser, Betriebssystem oder
        Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt
        automatisch, sobald Sie diese Website betreten.
      </p>{" "}
      <h4 className="text-lg font-semibold mb-2">
        Wof&uuml;r nutzen wir Ihre Daten?
      </h4>{" "}
      <p className="mb-2">
        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der
        Website zu gew&auml;hrleisten. Andere Daten k&ouml;nnen zur Analyse
        Ihres Nutzerverhaltens verwendet werden.
      </p>{" "}
      <h4 className="text-lg font-semibold mb-2">
        Welche Rechte haben Sie bez&uuml;glich Ihrer Daten?
      </h4>{" "}
      <p className="mb-2">
        Sie haben jederzeit das Recht, unentgeltlich Auskunft &uuml;ber
        Herkunft, Empf&auml;nger und Zweck Ihrer gespeicherten personenbezogenen
        Daten zu erhalten. Sie haben au&szlig;erdem ein Recht, die Berichtigung
        oder L&ouml;schung dieser Daten zu verlangen. Wenn Sie eine Einwilligung
        zur Datenverarbeitung erteilt haben, k&ouml;nnen Sie diese Einwilligung
        jederzeit f&uuml;r die Zukunft widerrufen. Au&szlig;erdem haben Sie das
        Recht, unter bestimmten Umst&auml;nden die Einschr&auml;nkung der
        Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren
        steht Ihnen ein Beschwerderecht bei der zust&auml;ndigen
        Aufsichtsbeh&ouml;rde zu.
      </p>{" "}
      <p className="mb-2">
        Hierzu sowie zu weiteren Fragen zum Thema Datenschutz k&ouml;nnen Sie
        sich jederzeit an uns wenden.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Analyse-Tools und Tools von Dritt&shy;anbietern
      </h3>{" "}
      <p className="mb-2">
        Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch
        ausgewertet werden. Das geschieht vor allem mit sogenannten
        Analyseprogrammen.
      </p>{" "}
      <p className="mb-2">
        Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der
        folgenden Datenschutzerkl&auml;rung.
      </p>
      <h2 className="text-2xl font-semibold mb-4">2. Hosting</h2>
      <p className="mb-2">
        Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
      </p>
      <h3 className="text-xl font-semibold mb-3">Externes Hosting</h3>{" "}
      <p className="mb-2">
        Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf
        dieser Website erfasst werden, werden auf den Servern des Hosters / der
        Hoster gespeichert. Hierbei kann es sich v.&nbsp;a. um IP-Adressen,
        Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten,
        Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die &uuml;ber
        eine Website generiert werden, handeln.
      </p>{" "}
      <p className="mb-2">
        Das externe Hosting erfolgt zum Zwecke der Vertragserf&uuml;llung
        gegen&uuml;ber unseren potenziellen und bestehenden Kunden (Art. 6 Abs.
        1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und
        effizienten Bereitstellung unseres Online-Angebots durch einen
        professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO). Sofern eine
        entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung
        ausschlie&szlig;lich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und
        &sect; 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von
        Cookies oder den Zugriff auf Informationen im Endger&auml;t des Nutzers
        (z.&nbsp;B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die
        Einwilligung ist jederzeit widerrufbar.
      </p>{" "}
      <p className="mb-2">
        Unser(e) Hoster wird bzw. werden Ihre Daten nur insoweit verarbeiten,
        wie dies zur Erf&uuml;llung seiner Leistungspflichten erforderlich ist
        und unsere Weisungen in Bezug auf diese Daten befolgen.
      </p>{" "}
      <p className="mb-2">Wir setzen folgende(n) Hoster ein:</p>
      <p>
        Vultr Holdings Corporation
        <br />
        319 Clematis Street Suite 900
        <br />
        West Palm Beach, FL 33401
        <br />
        <br />
        Serverstandort: Deutschland
      </p>
      <h4 className="text-lg font-semibold mb-2">Auftragsverarbeitung</h4>{" "}
      <p className="mb-2">
        Wir haben einen Vertrag &uuml;ber Auftragsverarbeitung (AVV) zur Nutzung
        des oben genannten Dienstes geschlossen. Hierbei handelt es sich um
        einen datenschutzrechtlich vorgeschriebenen Vertrag, der
        gew&auml;hrleistet, dass dieser die personenbezogenen Daten unserer
        Websitebesucher nur nach unseren Weisungen und unter Einhaltung der
        DSGVO verarbeitet.
      </p>
      <h2 className="text-2xl font-semibold mb-4">
        3. Allgemeine Hinweise und Pflicht&shy;informationen
      </h2>
      <h3 className="text-xl font-semibold mb-3">Datenschutz</h3>{" "}
      <p className="mb-2">
        Die Betreiber dieser Seiten nehmen den Schutz Ihrer pers&ouml;nlichen
        Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich
        und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser
        Datenschutzerkl&auml;rung.
      </p>{" "}
      <p className="mb-2">
        Wenn Sie diese Website benutzen, werden verschiedene personenbezogene
        Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie
        pers&ouml;nlich identifiziert werden k&ouml;nnen. Die vorliegende
        Datenschutzerkl&auml;rung erl&auml;utert, welche Daten wir erheben und
        wof&uuml;r wir sie nutzen. Sie erl&auml;utert auch, wie und zu welchem
        Zweck das geschieht.
      </p>{" "}
      <p className="mb-2">
        Wir weisen darauf hin, dass die Daten&uuml;bertragung im Internet
        (z.&nbsp;B. bei der Kommunikation per E-Mail) Sicherheitsl&uuml;cken
        aufweisen kann. Ein l&uuml;ckenloser Schutz der Daten vor dem Zugriff
        durch Dritte ist nicht m&ouml;glich.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Hinweis zur verantwortlichen Stelle
      </h3>{" "}
      <p className="mb-2">
        Die verantwortliche Stelle f&uuml;r die Datenverarbeitung auf dieser
        Website ist:
      </p>{" "}
      <p>
        Ravix Handels Unternehmergesellschaft (haftungsbeschr&auml;nkt)
        <br />
        Surmannsholt 12,
        <br />
        58452
        <br />
        Witten
        <br />
        Deutschland
      </p>
      <p>
        Telefon: +49 (0) 1783299319
        <br />
        E-Mail: contact@raphaelsacher.de
      </p>
      <p className="mb-2">
        Verantwortliche Stelle ist die nat&uuml;rliche oder juristische Person,
        die allein oder gemeinsam mit anderen &uuml;ber die Zwecke und Mittel
        der Verarbeitung von personenbezogenen Daten (z.&nbsp;B. Namen,
        E-Mail-Adressen o. &Auml;.) entscheidet.
      </p>
      <h3 className="text-xl font-semibold mb-3">Speicherdauer</h3>{" "}
      <p className="mb-2">
        Soweit innerhalb dieser Datenschutzerkl&auml;rung keine speziellere
        Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei
        uns, bis der Zweck f&uuml;r die Datenverarbeitung entf&auml;llt. Wenn
        Sie ein berechtigtes L&ouml;schersuchen geltend machen oder eine
        Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten
        gel&ouml;scht, sofern wir keine anderen rechtlich zul&auml;ssigen
        Gr&uuml;nde f&uuml;r die Speicherung Ihrer personenbezogenen Daten haben
        (z.&nbsp;B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im
        letztgenannten Fall erfolgt die L&ouml;schung nach Fortfall dieser
        Gr&uuml;nde.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf
        dieser Website
      </h3>{" "}
      <p className="mb-2">
        Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir
        Ihre personenbezogenen Daten auf Grundlage von Art. 6 Abs. 1 lit. a
        DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere Datenkategorien
        nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer
        ausdr&uuml;cklichen Einwilligung in die &Uuml;bertragung
        personenbezogener Daten in Drittstaaten erfolgt die Datenverarbeitung
        au&szlig;erdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie
        in die Speicherung von Cookies oder in den Zugriff auf Informationen in
        Ihr Endger&auml;t (z.&nbsp;B. via Device-Fingerprinting) eingewilligt
        haben, erfolgt die Datenverarbeitung zus&auml;tzlich auf Grundlage von
        &sect; 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind
        Ihre Daten zur Vertragserf&uuml;llung oder zur Durchf&uuml;hrung
        vorvertraglicher Ma&szlig;nahmen erforderlich, verarbeiten wir Ihre
        Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren
        verarbeiten wir Ihre Daten, sofern diese zur Erf&uuml;llung einer
        rechtlichen Verpflichtung erforderlich sind auf Grundlage von Art. 6
        Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage
        unseres berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO
        erfolgen. &Uuml;ber die jeweils im Einzelfall einschl&auml;gigen
        Rechtsgrundlagen wird in den folgenden Abs&auml;tzen dieser
        Datenschutzerkl&auml;rung informiert.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Empfänger von personenbezogenen Daten
      </h3>{" "}
      <p className="mb-2">
        Im Rahmen unserer Gesch&auml;ftst&auml;tigkeit arbeiten wir mit
        verschiedenen externen Stellen zusammen. Dabei ist teilweise auch eine
        &Uuml;bermittlung von personenbezogenen Daten an diese externen Stellen
        erforderlich. Wir geben personenbezogene Daten nur dann an externe
        Stellen weiter, wenn dies im Rahmen einer Vertragserf&uuml;llung
        erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind
        (z.&nbsp;B. Weitergabe von Daten an Steuerbeh&ouml;rden), wenn wir ein
        berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO an der Weitergabe
        haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe
        erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir
        personenbezogene Daten unserer Kunden nur auf Grundlage eines
        g&uuml;ltigen Vertrags &uuml;ber Auftragsverarbeitung weiter. Im Falle
        einer gemeinsamen Verarbeitung wird ein Vertrag &uuml;ber gemeinsame
        Verarbeitung geschlossen.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Widerruf Ihrer Einwilligung zur Datenverarbeitung
      </h3>{" "}
      <p className="mb-2">
        Viele Datenverarbeitungsvorg&auml;nge sind nur mit Ihrer
        ausdr&uuml;cklichen Einwilligung m&ouml;glich. Sie k&ouml;nnen eine
        bereits erteilte Einwilligung jederzeit widerrufen. Die
        Rechtm&auml;&szlig;igkeit der bis zum Widerruf erfolgten
        Datenverarbeitung bleibt vom Widerruf unber&uuml;hrt.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Widerspruchsrecht gegen die Datenerhebung in besonderen F&auml;llen
        sowie gegen Direktwerbung (Art. 21 DSGVO)
      </h3>{" "}
      <p className="mb-2">
        WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F
        DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GR&Uuml;NDEN, DIE SICH
        AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER
        PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH F&Uuml;R
        EIN AUF DIESE BESTIMMUNGEN GEST&Uuml;TZTES PROFILING. DIE JEWEILIGE
        RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE
        DIESER DATENSCHUTZERKL&Auml;RUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN
        WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES
        SEI DENN, WIR K&Ouml;NNEN ZWINGENDE SCHUTZW&Uuml;RDIGE GR&Uuml;NDE
        F&Uuml;R DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND
        FREIHEITEN &Uuml;BERWIEGEN ODER DIE VERARBEITUNG DIENT DER
        GELTENDMACHUNG, AUS&Uuml;BUNG ODER VERTEIDIGUNG VON
        RECHTSANSPR&Uuml;CHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
      </p>{" "}
      <p className="mb-2">
        WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU
        BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE
        VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE
        DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH F&Uuml;R DAS PROFILING,
        SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE
        WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT
        MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21
        ABS. 2 DSGVO).
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Beschwerde&shy;recht bei der zust&auml;ndigen Aufsichts&shy;beh&ouml;rde
      </h3>{" "}
      <p className="mb-2">
        Im Falle von Verst&ouml;&szlig;en gegen die DSGVO steht den Betroffenen
        ein Beschwerderecht bei einer Aufsichtsbeh&ouml;rde, insbesondere in dem
        Mitgliedstaat ihres gew&ouml;hnlichen Aufenthalts, ihres Arbeitsplatzes
        oder des Orts des mutma&szlig;lichen Versto&szlig;es zu. Das
        Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher
        oder gerichtlicher Rechtsbehelfe.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Recht auf Daten&shy;&uuml;bertrag&shy;barkeit
      </h3>{" "}
      <p className="mb-2">
        Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung
        oder in Erf&uuml;llung eines Vertrags automatisiert verarbeiten, an sich
        oder an einen Dritten in einem g&auml;ngigen, maschinenlesbaren Format
        aush&auml;ndigen zu lassen. Sofern Sie die direkte &Uuml;bertragung der
        Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur,
        soweit es technisch machbar ist.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Auskunft, Berichtigung und L&ouml;schung
      </h3>{" "}
      <p className="mb-2">
        Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit
        das Recht auf unentgeltliche Auskunft &uuml;ber Ihre gespeicherten
        personenbezogenen Daten, deren Herkunft und Empf&auml;nger und den Zweck
        der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder
        L&ouml;schung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
        personenbezogene Daten k&ouml;nnen Sie sich jederzeit an uns wenden.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Recht auf Einschr&auml;nkung der Verarbeitung
      </h3>{" "}
      <p className="mb-2">
        Sie haben das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer
        personenbezogenen Daten zu verlangen. Hierzu k&ouml;nnen Sie sich
        jederzeit an uns wenden. Das Recht auf Einschr&auml;nkung der
        Verarbeitung besteht in folgenden F&auml;llen:
      </p>{" "}
      <ul className="list-disc list-inside mb-2">
        {" "}
        <li className="mb-1">
          Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen
          Daten bestreiten, ben&ouml;tigen wir in der Regel Zeit, um dies zu
          &uuml;berpr&uuml;fen. F&uuml;r die Dauer der Pr&uuml;fung haben Sie
          das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen.
        </li>{" "}
        <li className="mb-1">
          Wenn die Verarbeitung Ihrer personenbezogenen Daten
          unrechtm&auml;&szlig;ig geschah/geschieht, k&ouml;nnen Sie statt der
          L&ouml;schung die Einschr&auml;nkung der Datenverarbeitung verlangen.
        </li>{" "}
        <li className="mb-1">
          Wenn wir Ihre personenbezogenen Daten nicht mehr ben&ouml;tigen, Sie
          sie jedoch zur Aus&uuml;bung, Verteidigung oder Geltendmachung von
          Rechtsanspr&uuml;chen ben&ouml;tigen, haben Sie das Recht, statt der
          L&ouml;schung die Einschr&auml;nkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen.
        </li>{" "}
        <li className="mb-1">
          Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben,
          muss eine Abw&auml;gung zwischen Ihren und unseren Interessen
          vorgenommen werden. Solange noch nicht feststeht, wessen Interessen
          &uuml;berwiegen, haben Sie das Recht, die Einschr&auml;nkung der
          Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
        </li>{" "}
      </ul>{" "}
      <p className="mb-2">
        Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten
        eingeschr&auml;nkt haben, d&uuml;rfen diese Daten &ndash; von ihrer
        Speicherung abgesehen &ndash; nur mit Ihrer Einwilligung oder zur
        Geltendmachung, Aus&uuml;bung oder Verteidigung von
        Rechtsanspr&uuml;chen oder zum Schutz der Rechte einer anderen
        nat&uuml;rlichen oder juristischen Person oder aus Gr&uuml;nden eines
        wichtigen &ouml;ffentlichen Interesses der Europ&auml;ischen Union oder
        eines Mitgliedstaats verarbeitet werden.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        SSL- bzw. TLS-Verschl&uuml;sselung
      </h3>{" "}
      <p className="mb-2">
        Diese Seite nutzt aus Sicherheitsgr&uuml;nden und zum Schutz der
        &Uuml;bertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen
        oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw.
        TLS-Verschl&uuml;sselung. Eine verschl&uuml;sselte Verbindung erkennen
        Sie daran, dass die Adresszeile des Browsers von &bdquo;http://&ldquo;
        auf &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol in Ihrer
        Browserzeile.
      </p>{" "}
      <p className="mb-2">
        Wenn die SSL- bzw. TLS-Verschl&uuml;sselung aktiviert ist, k&ouml;nnen
        die Daten, die Sie an uns &uuml;bermitteln, nicht von Dritten mitgelesen
        werden.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Widerspruch gegen Werbe-E-Mails
      </h3>{" "}
      <p className="mb-2">
        Der Nutzung von im Rahmen der Impressumspflicht ver&ouml;ffentlichten
        Kontaktdaten zur &Uuml;bersendung von nicht ausdr&uuml;cklich
        angeforderter Werbung und Informationsmaterialien wird hiermit
        widersprochen. Die Betreiber der Seiten behalten sich ausdr&uuml;cklich
        rechtliche Schritte im Falle der unverlangten Zusendung von
        Werbeinformationen, etwa durch Spam-E-Mails, vor.
      </p>
      <h2 className="text-2xl font-semibold mb-4">
        4. Datenerfassung auf dieser Website
      </h2>
      <h3 className="text-xl font-semibold mb-3">Server-Log-Dateien</h3>{" "}
      <p className="mb-2">
        Der Provider der Seiten erhebt und speichert automatisch Informationen
        in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns
        &uuml;bermittelt. Dies sind:
      </p>{" "}
      <ul className="list-disc list-inside mb-2">
        {" "}
        <li className="mb-1">Browsertyp und Browserversion</li>{" "}
        <li className="mb-1">verwendetes Betriebssystem</li>{" "}
        <li className="mb-1">Referrer URL</li>{" "}
        <li className="mb-1">Hostname des zugreifenden Rechners</li>{" "}
        <li className="mb-1">Uhrzeit der Serveranfrage</li>{" "}
        <li className="mb-1">IP-Adresse</li>{" "}
      </ul>{" "}
      <p className="mb-2">
        Eine Zusammenf&uuml;hrung dieser Daten mit anderen Datenquellen wird
        nicht vorgenommen.
      </p>{" "}
      <p className="mb-2">
        Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit.
        f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der
        technisch fehlerfreien Darstellung und der Optimierung seiner Website
        &ndash; hierzu m&uuml;ssen die Server-Log-Files erfasst werden.
      </p>
      <h3 className="text-xl font-semibold mb-3">Kontaktformular</h3>{" "}
      <p className="mb-2">
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
        Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen
        Kontaktdaten zwecks Bearbeitung der Anfrage und f&uuml;r den Fall von
        Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne
        Ihre Einwilligung weiter.
      </p>{" "}
      <p className="mb-2">
        Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1
        lit. b DSGVO, sofern Ihre Anfrage mit der Erf&uuml;llung eines Vertrags
        zusammenh&auml;ngt oder zur Durchf&uuml;hrung vorvertraglicher
        Ma&szlig;nahmen erforderlich ist. In allen &uuml;brigen F&auml;llen
        beruht die Verarbeitung auf unserem berechtigten Interesse an der
        effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1
        lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
        sofern diese abgefragt wurde; die Einwilligung ist jederzeit
        widerrufbar.
      </p>{" "}
      <p className="mb-2">
        Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns,
        bis Sie uns zur L&ouml;schung auffordern, Ihre Einwilligung zur
        Speicherung widerrufen oder der Zweck f&uuml;r die Datenspeicherung
        entf&auml;llt (z.&nbsp;B. nach abgeschlossener Bearbeitung Ihrer
        Anfrage). Zwingende gesetzliche Bestimmungen &ndash; insbesondere
        Aufbewahrungsfristen &ndash; bleiben unber&uuml;hrt.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Registrierung auf dieser Website
      </h3>{" "}
      <p className="mb-2">
        Sie k&ouml;nnen sich auf dieser Website registrieren, um
        zus&auml;tzliche Funktionen auf der Seite zu nutzen. Die dazu
        eingegebenen Daten verwenden wir nur zum Zwecke der Nutzung des
        jeweiligen Angebotes oder Dienstes, f&uuml;r den Sie sich registriert
        haben. Die bei der Registrierung abgefragten Pflichtangaben m&uuml;ssen
        vollst&auml;ndig angegeben werden. Anderenfalls werden wir die
        Registrierung ablehnen.
      </p>{" "}
      <p className="mb-2">
        F&uuml;r wichtige &Auml;nderungen etwa beim Angebotsumfang oder bei
        technisch notwendigen &Auml;nderungen nutzen wir die bei der
        Registrierung angegebene E-Mail-Adresse, um Sie auf diesem Wege zu
        informieren.
      </p>{" "}
      <p className="mb-2">
        Die Verarbeitung der bei der Registrierung eingegebenen Daten erfolgt
        zum Zwecke der Durchf&uuml;hrung des durch die Registrierung
        begr&uuml;ndeten Nutzungsverh&auml;ltnisses und ggf. zur Anbahnung
        weiterer Vertr&auml;ge (Art. 6 Abs. 1 lit. b DSGVO).
      </p>{" "}
      <p className="mb-2">
        Die bei der Registrierung erfassten Daten werden von uns gespeichert,
        solange Sie auf dieser Website registriert sind und werden
        anschlie&szlig;end gel&ouml;scht. Gesetzliche Aufbewahrungsfristen
        bleiben unber&uuml;hrt.
      </p>
      <h3 className="text-xl font-semibold mb-3">
        Kommentar&shy;funktion auf dieser Website
      </h3>{" "}
      <p className="mb-2">
        F&uuml;r die Kommentarfunktion auf dieser Seite werden neben Ihrem
        Kommentar auch Angaben zum Zeitpunkt der Erstellung des Kommentars, Ihre
        E-Mail-Adresse und, wenn Sie nicht anonym posten, der von Ihnen
        gew&auml;hlte Nutzername gespeichert.
      </p>
      <h4 className="text-lg font-semibold mb-2">Speicherung der IP-Adresse</h4>{" "}
      <p className="mb-2">
        Unsere Kommentarfunktion speichert die IP-Adressen der Nutzer, die
        Kommentare verfassen. Da wir Kommentare auf dieser Website nicht vor der
        Freischaltung pr&uuml;fen, ben&ouml;tigen wir diese Daten, um im Falle
        von Rechtsverletzungen wie Beleidigungen oder Propaganda gegen den
        Verfasser vorgehen zu k&ouml;nnen.
      </p>
      <h4 className="text-lg font-semibold mb-2">
        Speicherdauer der Kommentare
      </h4>{" "}
      <p className="mb-2">
        Die Kommentare und die damit verbundenen Daten werden gespeichert und
        verbleiben auf dieser Website, bis der kommentierte Inhalt
        vollst&auml;ndig gel&ouml;scht wurde oder die Kommentare aus rechtlichen
        Gr&uuml;nden gel&ouml;scht werden m&uuml;ssen (z.&nbsp;B. beleidigende
        Kommentare).
      </p>
      <h4 className="text-lg font-semibold mb-2">Rechtsgrundlage</h4>{" "}
      <p className="mb-2">
        Die Speicherung der Kommentare erfolgt auf Grundlage Ihrer Einwilligung
        (Art. 6 Abs. 1 lit. a DSGVO). Sie k&ouml;nnen eine von Ihnen erteilte
        Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung
        per E-Mail an uns. Die Rechtm&auml;&szlig;igkeit der bereits erfolgten
        Datenverarbeitungsvorg&auml;nge bleibt vom Widerruf unber&uuml;hrt.
      </p>
      <h2 className="text-2xl font-semibold mb-4">5. Soziale Medien</h2>
      <h3 className="text-xl font-semibold mb-3">
        eRecht24 Safe Sharing Tool
      </h3>{" "}
      <p className="mb-2">
        Die Inhalte auf dieser Website k&ouml;nnen datenschutzkonform in
        sozialen Netzwerken wie Facebook, X &amp; Co. geteilt werden. Diese
        Seite nutzt daf&uuml;r das{" "}
        <Link
          href="https://www.e-recht24.de/erecht24-safe-sharing.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          eRecht24 Safe Sharing Tool
        </Link>
        . Dieses Tool stellt den direkten Kontakt zwischen den Netzwerken und
        Nutzern erst dann her, wenn der Nutzer aktiv auf einen dieser Button
        klickt. Der Klick auf den Button stellt eine Einwilligung im Sinne des
        Art. 6 Abs. 1 lit. a DSGVO und &sect; 25 Abs. 1 TDDDG dar. Diese
        Einwilligung kann jederzeit mit Wirkung f&uuml;r die Zukunft widerrufen
        werden.
      </p>{" "}
      <p className="mb-2">
        Eine automatische &Uuml;bertragung von Nutzerdaten an die Betreiber
        dieser Plattformen erfolgt durch dieses Tool nicht. Ist der Nutzer bei
        einem der sozialen Netzwerke angemeldet, erscheint bei der Nutzung der
        Social-Media-Elemente von Facebook, X &amp; Co. ein
        Informations-Fenster, in dem der Nutzer den Text vor dem Absenden
        best&auml;tigen kann.
      </p>{" "}
      <p className="mb-2">
        Unsere Nutzer k&ouml;nnen die Inhalte dieser Seite datenschutzkonform in
        sozialen Netzwerken teilen, ohne dass komplette Surf-Profile durch die
        Betreiber der Netzwerke erstellt werden.
      </p>{" "}
      <p className="mb-2">
        Der Einsatz des Dienstes erfolgt, um die gesetzlich vorgeschriebenen
        Einwilligungen f&uuml;r den Einsatz bestimmter Technologien einzuholen.
        Rechtsgrundlage hierf&uuml;r ist Art. 6 Abs. 1 lit. c DSGVO.
      </p>
      <h2 className="text-2xl font-semibold mb-4">6. Newsletter</h2>
      <h3 className="text-xl font-semibold mb-3">Newsletter&shy;daten</h3>{" "}
      <p className="mb-2">
        Wenn Sie den auf der Website angebotenen Newsletter beziehen
        m&ouml;chten, ben&ouml;tigen wir von Ihnen eine E-Mail-Adresse sowie
        Informationen, welche uns die &Uuml;berpr&uuml;fung gestatten, dass Sie
        der Inhaber der angegebenen E-Mail-Adresse und mit dem Empfang des
        Newsletters einverstanden sind. Weitere Daten werden nicht bzw. nur auf
        freiwilliger Basis erhoben. F&uuml;r die Abwicklung der Newsletter
        nutzen wir Newsletterdiensteanbieter, die nachfolgend beschrieben
        werden.
      </p>
      <h3 className="text-xl font-semibold mb-3">Mailchimp</h3>{" "}
      <p className="mb-2">
        Diese Website nutzt die Dienste von Mailchimp f&uuml;r den Versand von
        Newslettern. Anbieter ist die Rocket Science Group LLC, 675 Ponce De
        Leon Ave NE, Suite 5000, Atlanta, GA 30308, USA.
      </p>{" "}
      <p className="mb-2">
        Mailchimp ist ein Dienst, mit dem u.a. der Versand von Newslettern
        organisiert und analysiert werden kann. Wenn Sie Daten zum Zwecke des
        Newsletterbezugs eingeben (z.&nbsp;B. E-Mail-Adresse), werden diese auf
        den Servern von Mailchimp in den USA gespeichert.
      </p>{" "}
      <p className="mb-2">
        Mit Hilfe von Mailchimp k&ouml;nnen wir unsere Newsletterkampagnen
        analysieren. Wenn Sie eine mit Mailchimp versandte E-Mail &ouml;ffnen,
        verbindet sich eine in der E-Mail enthaltene Datei (sog. web-beacon) mit
        den Servern von Mailchimp in den USA. So kann festgestellt werden, ob
        eine Newsletter-Nachricht ge&ouml;ffnet und welche Links ggf. angeklickt
        wurden. Au&szlig;erdem werden technische Informationen erfasst
        (z.&nbsp;B. Zeitpunkt des Abrufs, IP-Adresse, Browsertyp und
        Betriebssystem). Diese Informationen k&ouml;nnen nicht dem jeweiligen
        Newsletter-Empf&auml;nger zugeordnet werden. Sie dienen
        ausschlie&szlig;lich der statistischen Analyse von Newsletterkampagnen.
        Die Ergebnisse dieser Analysen k&ouml;nnen genutzt werden, um
        k&uuml;nftige Newsletter besser an die Interessen der Empf&auml;nger
        anzupassen.
      </p>{" "}
      <p className="mb-2">
        Wenn Sie keine Analyse durch Mailchimp wollen, m&uuml;ssen Sie den
        Newsletter abbestellen. Hierf&uuml;r stellen wir in jeder
        Newsletternachricht einen entsprechenden Link zur Verf&uuml;gung.
      </p>{" "}
      <p className="mb-2">
        Die Datenverarbeitung erfolgt auf Grundlage Ihrer Einwilligung (Art. 6
        Abs. 1 lit. a DSGVO). Sie k&ouml;nnen diese Einwilligung jederzeit
        widerrufen, indem Sie den Newsletter abbestellen. Die
        Rechtm&auml;&szlig;igkeit der bereits erfolgten
        Datenverarbeitungsvorg&auml;nge bleibt vom Widerruf unber&uuml;hrt.
      </p>{" "}
      <p className="mb-2">
        Die von Ihnen zum Zwecke des Newsletter-Bezugs bei uns hinterlegten
        Daten werden von uns bis zu Ihrer Austragung aus dem Newsletter bei uns
        bzw. dem Newsletterdiensteanbieter gespeichert und nach der Abbestellung
        des Newsletters aus der Newsletterverteilerliste gel&ouml;scht. Daten,
        die zu anderen Zwecken bei uns gespeichert wurden, bleiben hiervon
        unber&uuml;hrt.
      </p>{" "}
      <p className="mb-2">
        Die Daten&uuml;bertragung in die USA wird auf die
        Standardvertragsklauseln der EU-Kommission gest&uuml;tzt. Details finden
        Sie hier:{" "}
        <Link
          href="https://mailchimp.com/eu-us-data-transfer-statement/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://mailchimp.com/eu-us-data-transfer-statement/
        </Link>{" "}
        und{" "}
        <Link
          href="https://mailchimp.com/legal/data-processing-addendum/#Annex_C_-_Standard_Contractual_Clauses"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://mailchimp.com/legal/data-processing-addendum/#Annex_C_-_Standard_Contractual_Clauses
        </Link>
        .
      </p>{" "}
      <p className="mb-2">
        Nach Ihrer Austragung aus der Newsletterverteilerliste wird Ihre
        E-Mail-Adresse bei uns bzw. dem Newsletterdiensteanbieter ggf. in einer
        Blacklist gespeichert, sofern dies zur Verhinderung k&uuml;nftiger
        Mailings erforderlich ist. Die Daten aus der Blacklist werden nur
        f&uuml;r diesen Zweck verwendet und nicht mit anderen Daten
        zusammengef&uuml;hrt. Dies dient sowohl Ihrem Interesse als auch unserem
        Interesse an der Einhaltung der gesetzlichen Vorgaben beim Versand von
        Newslettern (berechtigtes Interesse im Sinne des Art. 6 Abs. 1 lit. f
        DSGVO). Die Speicherung in der Blacklist ist zeitlich nicht befristet.{" "}
        <strong>
          Sie k&ouml;nnen der Speicherung widersprechen, sofern Ihre Interessen
          unser berechtigtes Interesse &uuml;berwiegen.
        </strong>
      </p>{" "}
      <p className="mb-2">
        N&auml;heres entnehmen Sie den Datenschutzbestimmungen von Mailchimp
        unter:{" "}
        <Link
          href="https://mailchimp.com/legal/terms/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://mailchimp.com/legal/terms/
        </Link>
        .
      </p>
      <p className="mb-2">
        Das Unternehmen verf&uuml;gt &uuml;ber eine Zertifizierung nach dem
        &bdquo;EU-US Data Privacy Framework&ldquo; (DPF). Der DPF ist ein
        &Uuml;bereinkommen zwischen der Europ&auml;ischen Union und den USA, der
        die Einhaltung europ&auml;ischer Datenschutzstandards bei
        Datenverarbeitungen in den USA gew&auml;hrleisten soll. Jedes nach dem
        DPF zertifizierte Unternehmen verpflichtet sich, diese
        Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten
        Sie vom Anbieter unter folgendem Link:{" "}
        <Link
          href="https://www.dataprivacyframework.gov/s/participant-search/participant-detail?contact=true&id=a2zt0000000TXVKAA4&status=Active"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://www.dataprivacyframework.gov/s/participant-search/participant-detail?contact=true&id=a2zt0000000TXVKAA4&status=Active
        </Link>
        .
      </p>
      <h4 className="text-lg font-semibold mb-2">Auftragsverarbeitung</h4>{" "}
      <p className="mb-2">
        Wir haben einen Vertrag &uuml;ber Auftragsverarbeitung (AVV) zur Nutzung
        des oben genannten Dienstes geschlossen. Hierbei handelt es sich um
        einen datenschutzrechtlich vorgeschriebenen Vertrag, der
        gew&auml;hrleistet, dass dieser die personenbezogenen Daten unserer
        Websitebesucher nur nach unseren Weisungen und unter Einhaltung der
        DSGVO verarbeitet.
      </p>
      <h2 className="text-2xl font-semibold mb-4">7. Plugins und Tools</h2>
      <h3 className="text-xl font-semibold mb-3">
        YouTube mit erweitertem Datenschutz
      </h3>{" "}
      <p className="mb-2">
        Diese Website bindet Videos der Website YouTube ein. Betreiber der
        Website ist die Google Ireland Limited (&bdquo;Google&rdquo;), Gordon
        House, Barrow Street, Dublin 4, Irland.
      </p>{" "}
      <p className="mb-2">
        Wenn Sie eine dieser Website besuchen, auf denen YouTube eingebunden
        ist, wird eine Verbindung zu den Servern von YouTube hergestellt. Dabei
        wird dem YouTube-Server mitgeteilt, welche unserer Seiten Sie besucht
        haben. Wenn Sie in Ihrem YouTube-Account eingeloggt sind,
        erm&ouml;glichen Sie YouTube, Ihr Surfverhalten direkt Ihrem
        pers&ouml;nlichen Profil zuzuordnen. Dies k&ouml;nnen Sie verhindern,
        indem Sie sich aus Ihrem YouTube-Account ausloggen.
      </p>{" "}
      <p className="mb-2">
        Wir nutzen YouTube im erweiterten Datenschutzmodus. Videos, die im
        erweiterten Datenschutzmodus abgespielt werden, werden nach Aussage von
        YouTube nicht zur Personalisierung des Surfens auf YouTube eingesetzt.
        Anzeigen, die im erweiterten Datenschutzmodus ausgespielt werden, sind
        ebenfalls nicht personalisiert. Im erweiterten Datenschutzmodus werden
        keine Cookies gesetzt. Stattdessen werden jedoch sogenannte Local
        Storage Elemente im Browser des Users gespeichert, die &auml;hnlich wie
        Cookies personenbezogene Daten beinhalten und zur Wiedererkennung
        eingesetzt werden k&ouml;nnen. Details zum erweiterten Datenschutzmodus
        finden Sie hier:{" "}
        <Link
          href="https://support.google.com/youtube/answer/171780"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://support.google.com/youtube/answer/171780
        </Link>
        .
      </p>{" "}
      <p className="mb-2">
        Gegebenenfalls k&ouml;nnen nach der Aktivierung eines YouTube-Videos
        weitere Datenverarbeitungsvorg&auml;nge ausgel&ouml;st werden, auf die
        wir keinen Einfluss haben.
      </p>{" "}
      <p className="mb-2">
        Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden
        Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes
        Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine
        entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung
        ausschlie&szlig;lich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und
        &sect; 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von
        Cookies oder den Zugriff auf Informationen im Endger&auml;t des Nutzers
        (z.&nbsp;B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die
        Einwilligung ist jederzeit widerrufbar.
      </p>{" "}
      <p className="mb-2">
        Weitere Informationen &uuml;ber Datenschutz bei YouTube finden Sie in
        deren Datenschutzerkl&auml;rung unter:{" "}
        <Link
          href="https://policies.google.com/privacy?hl=de"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://policies.google.com/privacy?hl=de
        </Link>
        .
      </p>
      <p className="mb-2">
        Das Unternehmen verf&uuml;gt &uuml;ber eine Zertifizierung nach dem
        &bdquo;EU-US Data Privacy Framework&ldquo; (DPF). Der DPF ist ein
        &Uuml;bereinkommen zwischen der Europ&auml;ischen Union und den USA, der
        die Einhaltung europ&auml;ischer Datenschutzstandards bei
        Datenverarbeitungen in den USA gew&auml;hrleisten soll. Jedes nach dem
        DPF zertifizierte Unternehmen verpflichtet sich, diese
        Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten
        Sie vom Anbieter unter folgendem Link:{" "}
        <Link
          href="https://www.dataprivacyframework.gov/participant/5780"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://www.dataprivacyframework.gov/participant/5780
        </Link>
        .
      </p>
      <h2 className="text-2xl font-semibold mb-4">
        8. Online-Marketing und Partner&shy;programme
      </h2>
      <h3 className="text-xl font-semibold mb-3">
        Affiliate-Programme auf dieser Website
      </h3>{" "}
      <p className="mb-2">
        Wir nehmen an Affiliate-Partnerprogrammen teil. Bei
        Affiliate-Partner-Programmen werden Werbeanzeigen eines Unternehmens
        (Advertiser) auf Webseiten von anderen Unternehmen des
        Affiliate-Partner-Netzwerks (Publisher) platziert. Wenn Sie auf eine
        dieser Affiliate-Werbeanzeigen klicken, werden Sie zum beworbenen
        Angebot weitergeleitet. Sollten Sie anschlie&szlig;end eine bestimmte
        Transaktion (Conversion) t&auml;tigen, erh&auml;lt der Publisher
        hierf&uuml;r eine Verg&uuml;tung. Zur Berechnung dieser Verg&uuml;tung
        ist es erforderlich, dass der Affiliate-Netzwerkbetreiber nachvollziehen
        kann, &uuml;ber welche Werbeanzeige Sie auf das jeweilige Angebot
        gekommen sind und die vordefinierte Transaktion vorgenommen haben.
        Hierf&uuml;r werden Cookies oder vergleichbare
        Wiedererkennungstechnologien (z.&nbsp;B. Device-Fingerprinting)
        eingesetzt.
      </p>{" "}
      <p className="mb-2">
        Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6
        Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse
        an der korrekten Berechnung seiner Affiliate-Verg&uuml;tung. Sofern eine
        entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung
        ausschlie&szlig;lich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und
        &sect; 25 Abs. 1 TDDDG, soweit die Einwilligung die Speicherung von
        Cookies oder den Zugriff auf Informationen im Endger&auml;t des Nutzers
        (z.&nbsp;B. Device-Fingerprinting) im Sinne des TDDDG umfasst. Die
        Einwilligung ist jederzeit widerrufbar.
      </p>
      <p className="mb-2">Wir nehmen an folgenden Affiliate-Programmen teil:</p>
      <h4 className="text-lg font-semibold mb-2">
        Amazon Partner&shy;programm
      </h4>{" "}
      <p className="mb-2">
        Anbieter ist die Amazon Europe Core S.&agrave;.r.l. Details entnehmen
        Sie der Datenschutzerkl&auml;rung von Amazon unter:{" "}
        <Link
          href="https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://www.amazon.de/gp/help/customer/display.html?nodeId=201909010
        </Link>
        .
      </p>
      <p className="mb-2">
        Das Unternehmen verf&uuml;gt &uuml;ber eine Zertifizierung nach dem
        &bdquo;EU-US Data Privacy Framework&ldquo; (DPF). Der DPF ist ein
        &Uuml;bereinkommen zwischen der Europ&auml;ischen Union und den USA, der
        die Einhaltung europ&auml;ischer Datenschutzstandards bei
        Datenverarbeitungen in den USA gew&auml;hrleisten soll. Jedes nach dem
        DPF zertifizierte Unternehmen verpflichtet sich, diese
        Datenschutzstandards einzuhalten. Weitere Informationen hierzu erhalten
        Sie vom Anbieter unter folgendem Link:{" "}
        <Link
          href="https://www.dataprivacyframework.gov/s/participant-search/participant-detail?contact=true&id=a2zt0000000TOWQAA4&status=Active"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://www.dataprivacyframework.gov/s/participant-search/participant-detail?contact=true&id=a2zt0000000TOWQAA4&status=Active
        </Link>
        .
      </p>
      <h4 className="text-lg font-semibold mb-2">AWIN</h4>{" "}
      <p className="mb-2">
        Betreiber des Affiliate-Netzwerks ist die AWIN AG, Eichhornstra&szlig;e
        3, 10785 Berlin (nachfolgend &bdquo;AWIN&ldquo;).
      </p>{" "}
      <p className="mb-2">
        AWIN und der Publisher sind gemeinsam f&uuml;r die Datenverarbeitung im
        Zusammenhang mit dem Partnerprogramm verantwortlich. Die ihnen gemeinsam
        obliegenden Verpflichtungen wurden in einer Vereinbarung &uuml;ber
        gemeinsame Verarbeitung festgehalten. Laut dieser Vereinbarung
        k&ouml;nnen Sie sich mit Ihren datenschutzrechtlichen Anliegen an beide
        Verantwortlichen wenden. Der jeweils zuerst angesprochene
        Verantwortliche wird Ihre Anfrage beantworten. Jeder Verantwortliche
        h&auml;lt eigenst&auml;ndig Datenschutzinformationen nach Art. 13, 14
        und 26 DSGVO vor und trifft die erforderlichen Ma&szlig;nahmen zum
        Schutz personenbezogener Daten und zur Einhaltung der &uuml;brigen
        DSGVO-Vorschriften in seinem Unternehmen. Der Vertrag &uuml;ber
        gemeinsame Verarbeitung ist in den AGB von AWIN unter folgendem Link
        abrufbar:{" "}
        <Link
          href="https://s3.amazonaws.com/docs.awin.com/Legal/Publisher+Terms/2020/DE+Publisher+Terms+GDPR+Annex.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          https://s3.amazonaws.com/docs.awin.com/Legal/Publisher+Terms/2020/DE+Publisher+Terms+GDPR+Annex.pdf
        </Link>
        .
      </p>
    </div>
  );
}
