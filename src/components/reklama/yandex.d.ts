declare global {
  interface Window {
    yaContextCb: any[];
  }

  const Ya: {
    Context: {
      AdvManager: {
        render: (options: { blockId: string; renderTo: string }) => void;
      };
    };
  };
}

export {};
