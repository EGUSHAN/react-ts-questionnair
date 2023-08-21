import React from 'react';
import { useParams } from 'react-router-dom';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';

function Edit() {
  const { id } = useParams();

  const { loading, questionData } = useLoadQuestionData(id as string);

  return <div>{loading ? 'loading.....' : JSON.stringify(questionData)}</div>;
}

export default Edit;
