import React, {PropsWithChildren} from "react";
import { useHistory } from "react-router-dom";

interface RouteButtonProps {
    route: string;
}

export const RouteButton: React.FC<PropsWithChildren<RouteButtonProps>> = (props) => {
    const history = useHistory();
    return <div className="route-button" onClick={() => history.push(props.route)}>
        { props.children }
    </div>;
}
