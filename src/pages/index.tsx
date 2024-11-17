import {useRef} from "react";
import {toast} from "react-hot-toast";

export default function Home() {
  const fromRef = useRef<HTMLInputElement>(null);
  const toRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

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
        <button type={'submit'} className={'main_submit'}
                onClick={() => {
                  if (!fromRef.current?.value || !toRef.current?.value || !messageRef.current?.value) {
                    toast.error('Please fill in all fields');
                    return;
                  }

                  fetch('/api/confess/send', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      from: fromRef.current?.value,
                      to: toRef.current?.value,
                      message: messageRef.current?.value
                    })
                  }).then(res => res.json()).then(() => {
                    toast.success('Successfully sent message');
                    window.location.href = `/sent`;
                  })
                }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
