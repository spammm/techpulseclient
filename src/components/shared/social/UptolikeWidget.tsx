const UptolikeButtons = () => {
  const uptolikePid = process.env.NEXT_PUBLIC_UPTOLIKE_WIDGET_PID;

  if (!uptolikePid) return null;

  return (
    <div
      className="uptolike-buttons"
      data-mobile-view="true"
      data-share-size="30"
      data-like-text-enable="false"
      data-background-alpha="0.0"
      data-pid={uptolikePid}
      data-mode="share"
      data-background-color="#ffffff"
      data-hover-effect="scale"
      data-share-shape="round-rectangle"
      data-share-counter-size="12"
      data-icon-color="#ffffff"
      data-mobile-sn-ids="vk.tw.ok.wh.tm.vb."
      data-text-color="#000000"
      data-buttons-color="#ffffff"
      data-counter-background-color="#ffffff"
      data-share-counter-type="disable"
      data-orientation="horizontal"
      data-following-enable="false"
      data-sn-ids="tm.vk.wh.vb.ok.mr.tw."
      data-preview-mobile="false"
      data-selection-enable="true"
      data-exclude-show-more="false"
      data-share-style="2"
      data-counter-background-alpha="1.0"
      data-top-button="true"
    ></div>
  );
};

export { UptolikeButtons };
