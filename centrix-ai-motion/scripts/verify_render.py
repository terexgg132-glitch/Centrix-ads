"""Verify the exported Centrix AI videos and write a machine-readable report."""
import json
import subprocess
from pathlib import Path
import numpy as np

root=Path(__file__).resolve().parents[1]
expected={'landscape':(1920,1080),'portrait':(1080,1920)}
report={'project':'Centrix AI','expected_seconds':30,'expected_fps':30,'expected_frames':900,'videos':{},'assets':{},'checks_passed':True}
for name,(width,height) in expected.items():
    path=root/'out'/f'centrix-ai-{name}.mp4'
    info=json.loads(subprocess.check_output(['ffprobe','-v','error','-count_frames','-show_entries','stream=codec_type,codec_name,width,height,r_frame_rate,nb_read_frames,sample_rate,channels:format=duration,size','-of','json',str(path)]))
    v=next(s for s in info['streams'] if s['codec_type']=='video')
    a=next(s for s in info['streams'] if s['codec_type']=='audio')
    pcm=subprocess.check_output(['ffmpeg','-v','error','-i',str(path),'-f','f32le','-ac','1','-ar','48000','-'])
    samples=np.frombuffer(pcm,dtype='<f4')
    peak=float(np.max(np.abs(samples)))
    rms=float(np.sqrt(np.mean(samples*samples)))
    passed=(v['codec_name']=='h264' and v['width']==width and v['height']==height and v['r_frame_rate']=='30/1' and int(v['nb_read_frames'])==900 and a['codec_name']=='aac' and a['sample_rate']=='48000' and a['channels']==2 and abs(float(info['format']['duration'])-30)<.05 and peak<.99 and rms>.005)
    report['videos'][name]={'path':str(path.relative_to(root)),'resolution':[width,height],'duration_seconds':float(info['format']['duration']),'frames':int(v['nb_read_frames']),'video_codec':v['codec_name'],'audio_codec':a['codec_name'],'audio_sample_rate':int(a['sample_rate']),'audio_channels':a['channels'],'audio_peak':round(peak,4),'audio_rms':round(rms,4),'size_bytes':path.stat().st_size,'passed':passed}
    report['checks_passed'] &= passed
for name in ['public/audio/music.wav','public/audio/sfx.wav','node_modules/@fontsource/cairo/files']:
    found=(root/name).exists()
    report['assets'][name]=found
    report['checks_passed'] &= found
(root/'out'/'render-verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
print(json.dumps(report,indent=2))
if not report['checks_passed']: raise SystemExit(1)
