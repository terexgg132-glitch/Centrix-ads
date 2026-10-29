export const C = {
  night:'#061d20', deep:'#092d30', teal:'#104345', teal2:'#155c59', emerald:'#0f746d', mint:'#78c8b6', pale:'#ddf4eb', paper:'#f8f8f2', warm:'#f1ede2', white:'#ffffff', ink:'#163233', muted:'#78908d', line:'#dbe7e2', gold:'#d7ad5b', blue:'#dbe8f8'
} as const;
export const SHADOW = '0 28px 70px rgba(15,49,48,.13), 0 2px 8px rgba(15,49,48,.05)';
export const GLASS = 'linear-gradient(135deg,rgba(255,255,255,.97),rgba(246,251,248,.9))';
export const FONT = 'Cairo, sans-serif';
export const SCENE = {intro:[0,4], dashboard:[4,26], attendance:[9,15], finance:[15,20], followup:[20,26], outro:[26,30]} as const;
// Chat keyframes are local to the dashboard Sequence (30 fps).
export const FLOW = {attendance:{type:150,send:210,result:248},finance:{type:330,send:386,result:403},followup:{type:480,send:536,result:562}} as const;
export const DIALOGUE = {
  attendance:'اعرضلي ملخص الغياب النهارده',
  finance:'طب والمدفوعات أخبارها إيه؟',
  followup:'جهزلي متابعة للطلاب اللي غابوا',
} as const;
