import Controller from '@ember/controller';
import AFrame from 'aframe';

export default Controller.extend({
  aframeImport: AFrame,
  aframeGlobal: window.AFRAME
});
