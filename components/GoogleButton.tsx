import { googleIcon } from "@/public/icons";
import Image from "next/image";
import '@/public/styles/buttons/google.css';

export default function GoogleButton() {
    return (
        <button className="gsi-material-button" type="button">
            <div className="gsi-material-button-state"></div>
            <div className="gsi-material-button-content-wrapper">
                <div className="gsi-material-button-icon">
                    <Image
                        priority
                        src={googleIcon}
                        alt="google icon"
                    />
                </div>
                <span className="gsi-material-button-contents">Sign in with Google</span>
                <span style={{ display: 'none' }}>Sign in with Google</span>
            </div>
        </button>
    )
}