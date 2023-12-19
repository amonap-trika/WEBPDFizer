import React, { useEffect, useState } from 'react';
import { FaEye } from "react-icons/fa";
import { BsDownload, BsDot } from "react-icons/bs";
import { TbDownloadOff } from "react-icons/tb";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const WEBPDFizerHomePage = () => {
    const [textboxValue, setTextboxValue] = useState('');
    const [helpContent, setHelpContent] = useState([]);
    const [questionContent, setQuestionContent] = useState([]);
    const [settingContent, setSettingContent] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [progressData, setProgressData] = useState([])
    const [statusData, setStatusData] = useState()
    const settingData = {
        Pageizes: '',
        pageFormat: ['A0', 'A1',
            'A2',
            'A3',
            'A4',
            'A5',
            'A6',
            'A7',
            'A8',
            'A9',
            'B0',
            'B1',
            'B2',
            'B3',
            'B4',
            'B5',
            'B6',
            'B7',
            'B8',
            'B9',
            'B10',
            'C5E',
            'Comm10E',
            'DLE',
            'Executive',
            'Folio',
            'Ledger',
            'Legal',
            'Letter',
            'Tabloid',
        ],
        dimension: [
            '841 x 1189 mm, 33.1 x 46.8 in',
            '594 x 841 mm, 23.4 x 33.1 in',
            '420 x 594 mm, 16.5 x 23.4 in',
            '297 x 420 mm, 11.7 x 16.5 in',
            '210 x 297 mm, 8.3 x 11.7 in',
            '148 x 210 mm, 5.8 x 8.3 in',
            '105 x 148 mm, 4.1 x 5.8 in',
            '74 x 105 mm, 2.9 x 4.1 in',
            '52 x 74 mm, 2.1 x 2.9 in',
            '37 x 52 mm, 1.5 x 2.1 in',
            '1000 x 1414 mm, 39.4 x 55.7 in',
            '707 x 1000 mm, 27.8 x 39.4 in',
            '500 x 707 mm, 19.7 x 27.8 in',
            '353 x 500 mm, 13.9 x 19.7 in',
            '250 x 353 mm, 9.8 x 13.9 in',
            '176 x 250 mm, 6.9 x 9.8 in',
            '125 x 176 mm, 4.9 x 6.9 in',
            '88 x 125 mm, 3.5 x 4.9 in',
            '62 x 88 mm, 2.4 x 3.5 in',
            '44 x 62 mm, 1.7 x 2.4 in',
            '31 x 44 mm, 1.2 x 1.7 in',
            '163 x 229 mm',
            '105 x 241 mm, U.S. Common 10 Envelope',
            '110 x 220 mm',
            '7.25 x 10.5 in',
            '210 x 330 mm',
            '17 x 11 in',
            '8.5 x 14.0 in',
            '8.5 x 11.0 in',
            '11 x 17 in'
        ]
    }
    useEffect(() => {
        //api call
        setProgressData(newData)
    }, [])
    const helpData = [
        {
            topic: 'Help',
            sideHeading: 'Enter URL',
            points: [
                "Copy and paste the URL of the website you want to convert.",

            ]
        },
        {
            sideHeading: 'Additional Settings',
            points: [
                "Customize the Header and Footer in the PDF file.",
                "Choose your own page layout and other settings according to your preferences.",
            ]
        },
        {
            sideHeading: 'Convert and Download',
            points: [
                "Click 'Convert' and download your PDF. It's that simple!",

            ]
        },
        {
            sideHeading: 'Contact Us',
            points: [
                "webpdfiziersupport@gmail.com",
            ]
        }
    ];
    const faqData = [
        {
            topic: 'FAQ',
            question: 'What is WEBPDFizer and how does it work?',
            answer: 'WEBPDFizer is an online tool that allows you to convert any website into a PDF document. Simply enter the URL of the website you want to convert, customize the settings if desired, and download the resulting PDF .'
        }, {
            question: 'How can I customize the appearance of the converted PDF?',
            answer: 'WEBPDFizer offers customization options, allowing you to customize the header and footer in the PDF and change the layout of the page and other settings to suit your preferences. Explore our settings panel during the conversion process to tailor the PDF to your liking.'
        }, {
            question: 'Is the converted PDF an exact replica of the original website?',
            answer: 'Yes, Our technology aims to capture the essence of the webpage as accurately as possible.'
        }, {
            question: 'Can I access my converted PDFs on different devices?',
            answer: 'Yes, WEBPDFizer is designed to be cross-platform compatible. You can access your converted PDFs on various devices, including desktops, laptops, tablets, and smartphones.'
        }, {
            question: 'Do I need to create an account to use WEBPDFizer?',
            answer: 'No, creating an account is not mandatory '
        }, {
            question: 'How can I get in touch with customer support if I have further questions?',
            answer: 'If you have additional questions or need assistance, please visit our [Contact Us] page or email us at webpdfiziersupport@gmail.com. Our support team is here to help!'
        }
    ]
    const newData = [
        {
            id: 1,
            url: "www.google.com",
            status: "0",
            user_id: 1,
            createdAt: "2023-12-16T02:58:12.000Z",
            updatedAt: "2023-12-16T02:58:12.000Z"
        },
        {
            id: 2,
            url: "www.abc.com",
            status: "0",
            user_id: 1,
            createdAt: "2023-12-16T04:28:27.000Z",
            updatedAt: "2023-12-16T04:28:27.000Z"
        }
    ]
    const dummyProgressData = [{
        id: 111,
        status: 'completed'
    }, {
        id: 222,
        status: 'progress'
    }, {
        id: 333,
        status: 'progress'
    }, {
        id: 444,
        status: 'completed'
    }, {
        id: 555,
        status: 'progress'
    }, {
        id: 666,
        status: 'completed'
    },
    ]
    const dummyStatusData = [
        {
            xml: {
                total: 25,
                complete: 15,
                remaining: 10,
                percentage: 20
            },
            pdfGeneration: {
                total: 45,
                complete: 15,
                remaining: 30,
                percentage: 40
            },
            pdfMerge: {
                total: 25,
                complete: 20,
                remaining: 5,
                percentage: 90
            }
        }]




    const onSaveAsPdfClickBtnClick = async () => {
        // http://localhost:8080/api/website_pdfs
        // const req = axios.get('http://localhost:3000/users/getting');
        //const req = axios.post(`http://localhost:8080/api/website_pdfs/`);

        let req = await axios.post('http://localhost:8080/api/website_pdfs', {
            url: textboxValue
        }).then(()=>{
            alert('Success');
        }).catch((res)=>{
            alert('error');
        });
      
    }

    const onDownloadBtnClick = (id) => {
        //api call 
        console.log('download id', id)
    };
    const onViewBtnClick = (id) => {
        //api call
        console.log('clicked id', id)
        setStatusData(dummyStatusData);
        setIsModalOpen(true);
    };



    const openModal = (values) => {
        if (values === 'help') {
            setHelpContent(helpData);
        } else if (values === 'faq') {
            setQuestionContent(faqData);
        } else if (values === 'setting') {
            setSettingContent(settingData);
        }

        setIsModalOpen(true);
    };

    const closeModal = () => {
        setHelpContent('');
        setQuestionContent('');
        setSettingContent('');
        setStatusData('')
        setIsModalOpen(false);
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {

            closeModal();
        }
    };

    const urlTextbox = (event) => {
        console.log("textbox event", event.target.value)
        setTextboxValue(event.target.value);
    };
    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isModalOpen]);

    return (
        <div className='mt-5 h-screen' >
            <div className="h-50">

                <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', alignItems: 'center', width: '100%' }}>
                    <div className='flex items-center justify-end mr-60 '>
                        <img src={`./images/webpdfizer.png`} alt={"webpdfizer"} width={'85px'} height={'85px'} />
                    </div>
                    <div className='flex flex-row-reverse '>
                        <div className='flex items-start m-3'>
                            <button className="btn" onClick={() => openModal('help')}>Help</button>
                        </div>
                        <div className='flex items-center m-3'>
                            <button className="btn" onClick={() => openModal('faq')}>FAQ</button>
                        </div>
                        <div className='flex items-end m-3'>
                            <button className="btn" onClick={() => openModal('setting')}>Settings</button>
                        </div>
                        {isModalOpen && (
                            <dialog id="my_modal_1" className="modal" open>
                                <div className="modal-box h-4/6 max-w-4xl border-4 border-orange-500 p-14">

                                    {helpContent && helpContent.map((item, index) => (
                                        <div key={index}>
                                            <p className='font-bold text-3xl text-center'>{item.topic}</p>
                                            <h3 className="font-bold text-lg mt-5">{item.sideHeading}</h3>
                                            <ul>
                                                {item.points.map((point, pointIndex) => (
                                                    <li key={pointIndex} style={{ display: 'flex', alignItems: 'center', marginTop: '15px', marginLeft: '35px' }}>
                                                        <BsDot size={30} />
                                                        {point}
                                                    </li>
                                                ))}

                                            </ul>
                                        </div>
                                    ))}
                                    {questionContent && questionContent.map((item, index) => (

                                        <div key={index}>
                                            <p className='font-bold text-3xl text-center'>{item.topic}</p>
                                            <ul>
                                                <li key={index} style={{ display: 'flex', alignItems: 'center', marginTop: '5px', marginLeft: '35px' }}>
                                                    <div className="collapse collapse-arrow ">
                                                        <input type="radio" name="my-accordion-2" />
                                                        <div className="collapse-title text-xl font-medium">
                                                            {item.question}
                                                        </div>
                                                        <div className="collapse-content">
                                                            <p style={{ color: 'blue' }}>{item.answer}</p>
                                                        </div>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    ))}
                                    {settingContent && (
                                        <div >
                                            <p className='font-bold text-3xl text-center'>Settings</p>
                                            <p className='font-bold text-xl m-3'>Page sizes :</p>

                                            <p className='ml-9 text-lg'>We allow you to use all major standard page formats for the page size of your PDF.</p>
                                            <p className='mt-5 m-3 text-lg text-blue-800'> These are listed in the table below, with their corresponding dimensions. </p>
                                            <div className="overflow-x-auto">
                                                <table className="table ">
                                                    <thead>

                                                        <tr>
                                                            <th>Page Format</th>
                                                            <th>Dimensions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {settingContent.pageFormat.map((format, index) => (
                                                            <tr className="hover" key={index}>
                                                                <td>{format}</td>
                                                                <td>{settingContent.dimension[index]}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}



                                    {statusData && (
                                        <div className="overflow-x-auto h-[90%]">
                                            <p className='font-bold text-3xl text-center'>Status</p>
                                            <div className='h-[85%] flex flex-col justify-center'>

                                                <table className="table mt-10 ">
                                                    <thead>
                                                        <tr>
                                                            <th>Files</th>
                                                            <th>Status</th>
                                                            <th>Percentage</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {statusData.map((item, index) => (
                                                            <React.Fragment key={index}>
                                                                {Object.keys(item).map((key) => (
                                                                    <tr className="hover" key={key}>
                                                                        <td>{key}</td>
                                                                        <td>
                                                                            {Object.entries(item[key])
                                                                                .filter(([innerKey]) => innerKey !== 'percentage')
                                                                                .map(([innerKey, value]) => (
                                                                                    <span key={innerKey}>
                                                                                        {innerKey}: {value}{' '}
                                                                                    </span>
                                                                                ))}
                                                                        </td>
                                                                        <td><progress className="progress progress-info w-56" value={item[key].percentage} max="100"></progress>     </td>

                                                                    </tr>
                                                                ))}
                                                            </React.Fragment>
                                                        ))}

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                    <div className="modal-action">
                                        <form method="dialog">
                                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>✕</button>

                                        </form>



                                    </div>
                                </div>
                            </dialog>
                        )}

                    </div>
                </div>
            </div>
            <div style={{ position: 'relative', height: '400px', marginTop: '15px' }}>

                <img
                    src="./images/s.jpg"
                    alt="Backgroung photos"
                    style={{ width: '100%', height: '100%' }}
                />
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',

                    }}
                >
                    <div className="text-2xl text-white	">
                        <h1>Web to PDF made Easy !</h1><br></br>
                        <p>WEBPDFizer is a solution that empowers you to effortlessly convert entire websites into high-quality PDF files and we also ensure the precise conversion of the website and capturing the essence of the web content with accuracy.</p><br></br>
                        <p>Save, Share, and Print Your Online World in the form of PDF documents.!</p><br></br>


                    </div>


                    <div style={{ display: 'grid', gridTemplateColumns: '3.5fr 0.5fr', textAlign: 'center', marginTop: '20px' }}>
                        <input
                            type="text"
                            value={textboxValue}
                            onChange={urlTextbox}
                            placeholder="Enter the url"
                            className='shadow-2xl shadow-black'
                            style={{ borderRadius: '20px', width: '750px', height: '40px', textAlign: 'center', backgroundColor: 'white', border: '1px solid white', fontSize: '16px' }}

                        />
                        <button className="btn ml-8 btn-error" style={{ borderRadius: '40px', height: '40px !important' }} onClick={() => onSaveAsPdfClickBtnClick()}>save as pdf</button>

                    </div>
                </div>
            </div>
            <div className='mt-10 w-full'>
                <div className="overflow-x-auto mx-auto w-[50%] " style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    <table className="table" style={{ fontSize: '20px', width: '100%', border: '2px solid lightblue', textAlign: 'center' }}>
                        <thead>
                            <tr>
                                <th></th>
                                <th>URL</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {progressData !== null && progressData.length > 0 && progressData.map((item, index) => (
                                <tr key={item.id} className="hover">
                                    <td>{index + 1}</td>
                                    <td>{item.url}</td>
                                    <td className='flex justify-center gap-20'>
                                        <FaEye className='mx-2' onClick={() => { onViewBtnClick(item.url) }} />
                                        {item.status === 3 ? (
                                            <BsDownload className='mx-2' onClick={() => { onDownloadBtnClick(item.url) }} />
                                        ) : (
                                            <TbDownloadOff className='mx-2' />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div></div>
            <footer className=" footer items-center p-4 bg-neutral text-neutral-content mt-14 bottom-0">
                <aside className="items-center grid-flow-col ">
                    <svg width="36" height="36" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" className="fill-current ml-5"><path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path></svg>
                    <p className='ml-10'>Join Us on the Journey of Digital Convenience!<br />
                        Transform your online experience with WEBPDFizer. Start converting now and enjoy a seamless transition between the online and offline worlds.</p>
                </aside>
                {/* <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
                    <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                    </a>
                    <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                    <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                </nav> */}
            </footer>

        </div>
    );
}

export default WEBPDFizerHomePage;

