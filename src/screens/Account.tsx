import { useState } from "react";
import TonalButton from "../design/interface/Button/CommonButtons/TonalButton";
import Switch from "../design/interface/Switch/Switch";
import "../styles/Account.css";

const Account = () => {
    const [autoSync, setAutoSync] = useState(false);

    const [publicHistory, setPublicHistory] = useState(false);

    return (
        <div id="account-screen">
            <span id="account-title">Account</span>
            <div id="account-content">
                <span className="account-subtitle">Sync</span>

                <div className="account-article">
                    <div className="inline">
                        <span className="paragraph-title">
                            Auto sync on startup
                        </span>
                        <Switch
                            disabled
                            toggled={false}
                            onToggle={setAutoSync}
                            iconToggled="ri-download-cloud-2-line"
                            icon="ri-cloud-off-line"
                        />
                    </div>

                    <div className="inline">
                        <span className="paragraph-title">
                            Connect your Spotify account
                        </span>
                        <TonalButton
                            title="Spotify"
                            icon="ri-spotify-fill"
                            disabled
                            style={{
                                color: "#1ed760",
                                backgroundColor: "#05240F",
                            }}
                        />
                    </div>
                    <div className="inline">
                        <span className="paragraph-title">
                            Connect your YouTube account
                        </span>
                        <TonalButton
                            title="YouTube"
                            icon="ri-youtube-fill"
                            disabled
                            style={{
                                color: "#ff0101",
                                backgroundColor: "#3D0000",
                            }}
                        />
                    </div>

                    <div className="inline">
                        <span className="paragraph-title">
                            Last sync was at DD-MM-YYYY HH:MM:SS
                        </span>
                        <TonalButton
                            title="Sync now"
                            icon="ri-loop-left-line"
                            disabled
                            // style={{
                            //     color: "#ff0101",
                            //     backgroundColor: "#3D0000",
                            // }}
                        />
                    </div>
                </div>

                <span className="account-subtitle">Other</span>
                <div className="account-article">
                    <div className="inline">
                        <span className="paragraph-title">
                            Reset your password
                        </span>
                        <TonalButton
                            title="Reset"
                            icon="ri-key-line"
                            disabled
                            // style={{
                            //     color: "#DD4055",
                            //     backgroundColor: "#23060A",
                            // }}
                        />
                    </div>
                    <div className="inline">
                        <span className="paragraph-title">
                            Remove your account
                        </span>
                        <TonalButton
                            title="Delete"
                            icon="ri-delete-bin-line"
                            disabled
                            style={{
                                color: "#DD4055",
                                backgroundColor: "#23060A",
                            }}
                        />
                    </div>
                </div>

                <span className="account-subtitle">Visibility</span>
                <div className="account-article">
                    <div className="inline">
                        <div className="paragraph">
                            <span className="paragraph-title">
                                Public profile
                            </span>
                            <span className="paragraph-desc">
                                If this setting is enabled, your account can be
                                found while searching. Stranger users will be
                                able to see your public playlists, follow and
                                add you to their's friends list.
                            </span>
                        </div>
                        <Switch
                            // disabled
                            toggled={publicHistory}
                            onToggle={setPublicHistory}
                            iconToggled="ri-check-line"
                            icon="ri-close-line"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Account;
