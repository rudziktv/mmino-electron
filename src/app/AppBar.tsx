import { maximizeApp, minimizeApp } from "../../electron/ipc";
import "./AppBar.css";

const AppBar = (props: AppBarProps) => {
    return (
        <div id="app-bar">
            <span>ICON</span>
            <span id="window-title">Mmino</span>
            <div id="window-controls">
                <button id="minApp" onClick={() => minimizeApp()} />
                <button id="maxApp" onClick={() => maximizeApp()} />
                <button id="closeApp" onClick={() => window.close()} />
            </div>
        </div>
    );
};

export interface AppBarProps {}

export default AppBar;
