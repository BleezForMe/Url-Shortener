import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shortenUrlAsync, getShortenedUrlAsync } from './reducers/urlReducer';
import {getShortenedUrl} from "./api/api";

function App() {
    const dispatch = useDispatch();
    const url = useSelector((state) => state.url);
    const [inputUrl, setInputUrl] = useState('');

    const handleShortenUrl = () => {
        dispatch(shortenUrlAsync(inputUrl));
    };

    useEffect(() => {
        const path = window.location.pathname.replace('/', '');
        console.log(path)
        if (path) {
            getShortenedUrl(path).then((response)=>{
                console.log(response.url)
                window.location.replace(response.url);

            });
        }
    }, [dispatch]);

    return (
        <div>
            <h1>Shorten URL App</h1>
            <div>
                <label htmlFor="inputUrl">URL:</label>
                <input
                    id="inputUrl"
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleShortenUrl}>Shorten URL</button>
            </div>
            {url && (
                <div>
                    <p>Short URL:</p>
                    <a href={url.id}>{url.id}</a>
                </div>
            )}
        </div>
    );
}

export default App;
