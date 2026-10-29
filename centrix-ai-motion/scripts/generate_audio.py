"""Generate original, timeline-synced Centrix AI music and UI sound effects."""
from pathlib import Path
import numpy as np
import wave

SR=48000
DURATION=30
N=SR*DURATION
rng=np.random.default_rng(73121)
master=np.zeros(N,dtype=np.float64)
sfx=np.zeros(N,dtype=np.float64)

def add(buf,start,data,gain=1):
    i=int(round(start*SR)); j=min(i+len(data),N)
    if j>i: buf[i:j]+=data[:j-i]*gain

def env(t,attack=.02,decay=.4):
    return np.minimum(1,t/max(attack,.00001))*np.exp(-t/max(decay,.00001))

def tone(freq,duration,kind='sine'):
    t=np.arange(int(duration*SR))/SR
    phase=2*np.pi*freq*t
    if kind=='bell': return np.sin(phase)+.38*np.sin(phase*2.01)+.15*np.sin(phase*3.93)
    if kind=='warm': return np.sin(phase)+.21*np.sin(phase*2)+.07*np.sin(phase*3)
    return np.sin(phase)

def impact(at,power=.3):
    d=1.5;t=np.arange(int(d*SR))/SR
    low=(np.sin(2*np.pi*(75*t-15*t*t))+0.4*np.sin(2*np.pi*118*t))*np.exp(-t*5)
    grit=rng.normal(0,1,len(t)); grit=np.convolve(grit,np.ones(55)/55,mode='same')*np.exp(-t*16)
    shimmer=(np.sin(2*np.pi*790*t)+.5*np.sin(2*np.pi*1180*t))*np.exp(-t*3.3)
    add(sfx,at,(low*.7+grit*.45+shimmer*.17)*power)

def whoosh(at,d=.62,amp=.11):
    t=np.arange(int(d*SR))/SR
    noise=rng.normal(0,1,len(t))
    smooth=np.convolve(noise,np.ones(31)/31,mode='same')
    sweep=np.sin(np.pi*t/d)**1.6
    airy=(smooth*.8+np.sin(2*np.pi*(290*t+350*t*t))*.09)*sweep
    add(sfx,at,airy*amp)

def click(at,amp=.16):
    d=.095;t=np.arange(int(d*SR))/SR
    noise=rng.normal(0,1,len(t))
    top=np.sin(2*np.pi*1700*t)*np.exp(-t*85)
    body=np.sin(2*np.pi*420*t)*np.exp(-t*55)
    add(sfx,at,(noise*.28*np.exp(-t*130)+top*.42+body*.45)*amp)

def pop(at,base=680,amp=.11):
    d=.36;t=np.arange(int(d*SR))/SR
    a=np.sin(2*np.pi*(base*t-110*t*t))*np.exp(-t*15)
    b=np.sin(2*np.pi*(base*1.5*t))*np.exp(-t*8)
    add(sfx,at,(a+.33*b)*amp)

def pulse(at,base=210):
    d=.34;t=np.arange(int(d*SR))/SR
    a=(np.sin(2*np.pi*(base*t+60*t*t))+.24*np.sin(2*np.pi*base*2*t))*np.sin(np.pi*np.minimum(t/d,1))**2
    add(sfx,at,a*.048)

# Original restrained harmonic bed in D minor with evolving synth pad, low pulse, and notes.
for start,notes in [(0,[146.83,174.61,220.00]),(7.5,[130.81,174.61,220.00]),(15,[116.54,146.83,196.00]),(22.5,[130.81,174.61,261.63])]:
    for j,n in enumerate(notes):
        dur=7.9;t=np.arange(int(dur*SR))/SR
        fade=np.minimum(1,t/1.25)*np.minimum(1,(dur-t)/1.3)
        slow=.84+.16*np.sin(2*np.pi*.14*t+j*1.8)
        wavev=(np.sin(2*np.pi*n*t)+.23*np.sin(2*np.pi*2*n*t)+.12*np.sin(2*np.pi*(n*.503)*t))*fade*slow
        add(master,start,wavev,.034)
for at in np.arange(.5,29.5,.75):
    note=[293.66,349.23,440,523.25,440,349.23,261.63,349.23][int(at/.75)%8]
    d=.72;t=np.arange(int(d*SR))/SR
    pluck=tone(note,d,'bell')*env(t,.003,.28)
    add(master,float(at),pluck,.012 if at<4 or at>26 else .008)
for at in np.arange(1.0,29.2,1.5):
    d=.6;t=np.arange(int(d*SR))/SR
    kick=np.sin(2*np.pi*(73*t-24*t*t))*np.exp(-t*10)
    add(master,float(at),kick,.035)
# Lift chords on three results and final reveal.
for at in [12.28,17.43,22.75,26.8]:
    for note in [440,554.37,659.25]:
        d=1.45;t=np.arange(int(d*SR))/SR
        add(master,at,tone(note,d,'warm')*env(t,.14,.9),.012)
# Intro and final cinematic cues.
impact(.39,.34); whoosh(.12,.7,.30)
for k in range(9): pop(.8+k*.12,860+k*42,.021)
whoosh(3.82,.7,.40); whoosh(4.55,.55,.23)
# Representative card entrance ticks in dashboard.
for at in [5.12,5.38,5.65,6.0,7.25]: pop(at,730,.047)
# Three typed Arabic queries; deterministic varied key spacing and level.
for start,count,dur in [(9.03,30,1.73),(15.03,28,1.72),(20.03,33,1.72)]:
    times=np.linspace(start,start+dur,count)
    for j,at in enumerate(times): click(float(at)+(float(rng.random())-.5)*.018,.095+float(rng.random())*.025)
for at in [11.0,16.87,21.87]: click(at,.26); pop(at+.055,1120,.055)
for start in [11.27,17.13,22.05]:
    for k in range(3): pulse(start+k*.2,205+k*38)
for at in [12.28,17.43,22.73]:
    pop(at,620,.18); pop(at+.08,950,.065)
whoosh(14.82,.45,.27); whoosh(19.82,.45,.27)
pop(24.37,1100,.09)
whoosh(25.82,.82,.38);impact(26.73,.52)
for k in range(13): pop(26.87+k*.07,800+k*37,.019)
# Gentle ending tail, keep headroom and prevent clipping.
fade=np.ones(N); tail=np.arange(int(.75*SR))/SR; fade[-len(tail):]=1-tail**1.5
master*=fade;sfx*=fade
master=np.tanh(master*1.1)*.72
sfx=np.tanh(sfx*1.25)*.83
out=Path('public/audio');out.mkdir(parents=True,exist_ok=True)
for name,data in [('music.wav',master),('sfx.wav',sfx)]:
    stereo=np.stack([data,data],axis=1)
    pcm=(np.clip(stereo,-.99,.99)*32767).astype('<i2')
    with wave.open(str(out/name),'wb') as w:
        w.setnchannels(2);w.setsampwidth(2);w.setframerate(SR);w.writeframes(pcm.tobytes())
    print(f'{name}: peak={np.max(np.abs(data)):.3f}, RMS={np.sqrt(np.mean(data**2)):.4f}')
