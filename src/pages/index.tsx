import {useRef, useState} from "react";
import {toast} from "react-hot-toast";
import {HexColorPicker} from "react-colorful";

export default function Home() {
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const [Color, setColor] = useState<string>('#000000');

  return (
    <div className={'flex flex-col justify-center items-center' }>
      <div>
        <h1 className={`text-3xl font-bold`}>Menfess</h1>
        <p className={`text-lg`}>A simple, secure, and anonymous way to send and receive messages.</p>
        <div className={'flex flex-row w-full'}>
          <input type={'text'} placeholder={'From'} className={'main_input'} ref={fromRef}/>
          <input type={'text'} placeholder={'To'} className={'main_input'} ref={toRef}/>
        </div>
        <textarea placeholder={'Message'} className={'main_input'} ref={messageRef}/>
        <div className={'flex flex-row w-full'}>
            <HexColorPicker className={'w-full mb-10 mr-10'} color={Color} onChange={setColor}/>
            <div className={'flex flex-col'}>
                <p>Color: <span className={'text-sm'}>{Color}</span></p>
                <div className={`p-10 rounded-xl`} style={{ backgroundColor: `${Color}` }}>Preview</div>
            </div>
        </div>
        <button type={'submit'} className={'main_submit'}
                onClick={() => {
                  if (!fromRef.current?.value || !toRef.current?.value || !messageRef.current?.value) {
                    toast.error('Please fill in all fields');
                    return;
                  }

                  fetch('/api/confess/send', {
                    method: 'POST',
                    headers: {
                      // 'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      from: fromRef.current?.value,
                      to: toRef.current?.value,
                      message: messageRef.current?.value,
                      color: Color,
                    })
                  }).then(res => res.json()).then((data) => {
                    if (data.error) {
                      toast.error(data.error);
                      return;
                    }
                    toast.success('Successfully sent message');
                    window.location.href = `/sent`;
                  }).catch(err => {
                    console.error(err);
                    toast.error('Something went wrong');
                  });
                }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
