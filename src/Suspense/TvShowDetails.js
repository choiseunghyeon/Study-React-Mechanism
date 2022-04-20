import React, { Suspense } from "react";
import { getTvDataResource, getCommentsResource } from "./helpers/Api";
import { Spinner } from "./Spinner";

const Comments = ({ id }) => {
  const commentsResource = getCommentsResource(id).read();
  const comments = commentsResource.map(comment => (
    <div className="comment" key={comment.id}>
      <h4>{comment.title}</h4>
      <div className="text">{comment.text}</div>
    </div>
  ));

  return (
    <div className="flex flex-col comments">
      <h3>Comments</h3>
      {comments}
    </div>
  );
};

const Details = ({ id }) => {
  const tvShowResource = getTvDataResource(id).read();
  return (
    <div className="flex">
      <div>
        <h2>{tvShowResource.name}</h2>
        <div className="details">{tvShowResource.description}</div>
      </div>
      <div>
        <img src={`https://res.cloudinary.com/dqsubx7oc/image/upload/w_200/v1582908284/tv-shows/${id}.jpg`} alt={tvShowResource.name} />
      </div>
    </div>
  );
};

export const TvShowDetails = ({ id }) => {
  return (
    <div className="tvshow-details">
      <Suspense fallback={<Spinner />}>
        <Details id={id} />
        <Suspense fallback={<Spinner />}>
          <Comments id={id} />
        </Suspense>
      </Suspense>
    </div>
  );
};
