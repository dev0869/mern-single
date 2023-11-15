import { useSelector } from 'react-redux';
import '../../components/index.css'
const CallSuccess = () => {
    const id = localStorage.getItem("cbid")
    const data = useSelector((state) => state.dummy.bookingtestride);

    // const [ele,setEle]=useState()
  return (
  
      <div className="cardq my-0 my-md-5">
        <div
          style={{
            borderRadius: "50%",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
          }}
        >
          <i className="checkmark">✓</i>
        </div>
        <h1 className="tag">Success</h1>
        <p className='text-center mb-0'>Mr/Mrs :  {data.name}</p>
        <p className="tag2">Your Request Callback Has Been Confirmed</p>
        <p style={{ textAlign: "center" }}>
          Your booking ID is : {id}
        </p>
      </div>
  );
}

export default CallSuccess;
