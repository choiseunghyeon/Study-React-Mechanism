import React from "react";
import { getTvMetadataResource } from "./helpers/Api";

export const TvShowList = ({ onClick }) => {
  const tvMetadata = getTvMetadataResource().read();
  const tvshows = tvMetadata.map(item => (
    <div className="item" key={item.id} onClick={() => onClick(item.id)}>
      <div className="name">{item.name}</div>
      <div className="score">{item.score}</div>
    </div>
  ));
  return <div className="tvshow-list">{tvshows}</div>;
};
