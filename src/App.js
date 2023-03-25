import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shortenUrlAsync } from './reducers/urlReducer';
import { getShortenedUrl } from './api/api';
import Swal from 'sweetalert2';
import './css/app.scss';
import doodle from './imgs/rastors/homepage_doodle.png';
import shape from './imgs/rastors/Vector.png';
import { ReactComponent as Lines } from './imgs/vectors/lines.svg';
import { ReactComponent as ShapeRightDown } from './imgs/vectors/rd.svg';
import {Helmet} from "react-helmet";

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

function App() {
    const dispatch = useDispatch();
    const url = useSelector((state) => state.url);
    const [inputUrl, setInputUrl] = useState('');

    const handleShortenUrl = () => {
        if (isValidUrl(inputUrl)) {
            dispatch(shortenUrlAsync(inputUrl));
            Swal.fire({
                title: 'Good job!',
                text: 'Congratulations! Your link has been shortened.',
                icon: 'success',
                confirmButtonText: 'Close',
            });
        } else {
            Swal.fire({
                title: 'ERROR!',
                text: 'Try again, did you provide a correct link?',
                icon: 'error',
                confirmButtonText: 'Close',
            });
        }
    };

    useEffect(() => {
        const path = window.location.pathname.replace('/', '');
        console.log(path);
        if (path) {
            getShortenedUrl(path).then((response) => {
                console.log(response.url);
                window.location.replace(response.url);
            });
        }
    }, [dispatch]);

    return (
        <div>
            <Helmet>
                <title>Url Shortener</title>
                <meta name="description" content="Simplest URL shortener" />
                <meta property="og:title" content="Url Shortener" />
                <meta property="og:description" content="Simplest URL shortener" />
                <meta property="og:url" content="https://url.copedix.pl" />
                <meta name="twitter:title" content="Url Shortener" />
                <meta name="twitter:description" content="Simplest URL shortener" />
            </Helmet>
            <Lines className={'svg_lines'} />
            <ShapeRightDown className={'svg_rd'} />
            <div className={'maincontainer'}>
                <div className={'cont_left'}>
                    <img className={'yellow'} src={shape} alt={''} />
                    <span className={'top_span'}>Simplest url shortener</span>
                    <span className={'bottom_span'}>
                        URL shortener converts long URLs into shorter ones for easier sharing. It's ideal for social media, email campaigns, and online marketing. Try on your own!
                    </span>
                    <input
                        className={'shortInput'}
                        id='inputUrl'
                        type='text'
                        placeholder={'Your link'}
                        value={inputUrl}
                        onChange={(e) => setInputUrl(e.target.value)}
                    />

                    <button className={'button_blue'} onClick={handleShortenUrl}>
                        Shorten URL
                    </button>

                    {url && (
                        <span className={'urlspan'}>
              Your shortened url:{' '}
                            <a className={'urllink'} href={url.id}>
                url.copedix.pl/{url.id}
              </a>
            </span>
                    )}
                </div>
                <img className={'imgright'} src={doodle} alt={''} />
            </div>
        </div>
    );
}

export default App;
