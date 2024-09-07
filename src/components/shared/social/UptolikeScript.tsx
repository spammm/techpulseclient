import Script from 'next/script';

const UptolikeScript = () => {
  const isNotPid = !process.env.NEXT_PUBLIC_UPTOLIKE_WIDGET_PID;

  if (isNotPid) return null;

  return (
    <Script
      id="uptolike-script"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(w,doc) {
        if (!w.__utlWdgt ) {
            w.__utlWdgt = true;
            var d = doc, s = d.createElement('script'), g = 'getElementsByTagName';
            s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
            s.src = (w.location.protocol == 'https:' ? 'https' : 'http')  + '://w.uptolike.com/widgets/v1/uptolike.js';
            var h=d.getElementsByTagName('body')[0];
            h.appendChild(s);
        }})(window,document);`,
      }}
    />
  );
};

export { UptolikeScript };
