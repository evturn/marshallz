import React from 'react';
import ReactDOM from 'react-dom';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

export default function createDevToolsWindow(store) {
  const name = 'Redux DevTools';
  const win = window.open(
    null,
    name,
    'menubar=no,location=no,resizable=yes,scrollbars=no,status=no,width=450,height=5000'
  );

  win.location.reload();
  win.document.title = name;
  setTimeout(() => ReactDOM.render(
    <DebugPanel top right bottom left>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>,
    win.document.body.appendChild(document.createElement('div'))
  ), 10);
}
