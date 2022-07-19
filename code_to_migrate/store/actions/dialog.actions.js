export const OPEN_DIALOG = '[DIALOG] OPEN DIALOG';
export const CLOSE_DIALOG = '[DIALOG] CLOSE DIALOG';

export function openDialog(options) {
  return {
    type : OPEN_DIALOG,
    payload : {
      options
    }
  };
}

export function closeDialog() {
  return {
    type : CLOSE_DIALOG
  };
}
