import {useDispatch} from 'react-redux';
import {githubSlice} from '../store/github/github.slice';
import {bindActionCreators} from '@reduxjs/toolkit';

const actions = {...githubSlice.actions};

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actions, dispatch);
};
