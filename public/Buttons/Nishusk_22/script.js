"use strict";function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

import React from "https://cdn.skypack.dev/react@17.0.1";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.1";
import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";
import { RoughnessMipmapper } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/utils/RoughnessMipmapper.js";

console.clear();

const ICON_WIDTH = 192;
const ICON_HEIGHT = 192;

const ASSETS_PATH = "https://assets.codepen.io/430361/";

const IS_DEBUG = false;

function getRadian(degree) {
  return degree * Math.PI / 180;
}

class HomeButton extends React.Component {




  constructor(props) {
    super(props);_defineProperty(this, "canvas", null);_defineProperty(this, "scene", null);_defineProperty(this, "camera", null);

    this.state = {
      homeIconShown: false,
      homeIconAngleX: 0,
      homeIconAngleY: 0 };


    this.canvasRef = React.createRef();
    this.updateRef = React.createRef();
  }

  componentDidMount() {
    this.initialize();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.updateLoop);
  }

  initialize() {
    this.createScene();
    this.setRenderer();
    this.setLighting();

    this.camera.position.z = 2.5;

    this.loadHouseModel();
    this.setUpdater();
  }

  createScene() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
    45, ICON_WIDTH / ICON_HEIGHT, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvasRef.current,
      alpha: !IS_DEBUG });

  }

  setRenderer() {
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(ICON_WIDTH, ICON_HEIGHT);

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  setLighting() {
    const ambientColor = 0xFFFFFF;
    const ambientIntensity = 0.7;
    const ambientLight = new THREE.AmbientLight(ambientColor, ambientIntensity);

    this.scene.add(ambientLight);

    const directionalColor = 0xFFFFFF;
    const directionalIntensity = 1;

    const directionalLight = new THREE.DirectionalLight(
    directionalColor, directionalIntensity);
    const directionalX = -1;
    const directionalY = 1;
    const directionalZ = 2;

    directionalLight.position.set(directionalX, directionalY, directionalZ);
    directionalLight.castShadow = true;

    this.scene.add(directionalLight);
    this.scene.add(directionalLight.target);

    if (IS_DEBUG === true) {
      this.scene.add(
      new THREE.CameraHelper(directionalLight.shadow.camera));
    }
  }

  loadHouseModel() {
    this.homeObj = null;

    new GLTFLoader().load(`${ASSETS_PATH}home_button.glb`, gltf => {
      this.homeObj = gltf.scene;

      const roughnessMipMapper = new RoughnessMipmapper(this.renderer);

      this.homeObj.traverse(child => {
        if (child.isMesh) {
          roughnessMipMapper.generateMipmaps(child.material);
        }
      });

      this.scene.add(this.homeObj);

      this.homeObj.position.y -= 0.1;
    });
  }

  setUpdater() {
    this.updateLoop = requestAnimationFrame(this.setUpdater.bind(this));

    if (this.state.homeIconShown === false) {
      return;
    }

    if (this.homeObj !== null) {
      this.homeObj.rotation.y = -this.state.homeIconAngleX * 0.05;
      this.homeObj.rotation.x = -this.state.homeIconAngleY * 0.05;
    }

    this.renderer.render(this.scene, this.camera);
  }

  render() {
    let canvasClassName = "btn-3d-icon__icon";

    if (this.state.homeIconShown === true) {
      canvasClassName += " btn-3d-icon__icon-shown";
    }

    return /*#__PURE__*/(
      React.createElement("b", { className: "btn-3d-icon" }, /*#__PURE__*/
      React.createElement("button", {
        className: "btn-3d-icon__button",
        onMouseOver: () => {
          this.setState({
            homeIconShown: true,
            homeIconAngleX: 0,
            homeIconAngleY: 0 });

        },
        onMouseOut: () => {
          this.setState({
            homeIconShown: false });

        },
        onMouseMove: evt => {
          let newX = evt.target.clientWidth / 2 - evt.nativeEvent.offsetX;
          let newY = evt.target.clientHeight / 2 - evt.nativeEvent.offsetY;

          this.setState({
            homeIconAngleX: newX,
            homeIconAngleY: newY });

        } }, /*#__PURE__*/
      React.createElement("span", null, /*#__PURE__*/
      React.createElement("span", null, "Home"), /*#__PURE__*/
      React.createElement("span", null, "Hover to show icon"))), /*#__PURE__*/


      React.createElement("canvas", {
        className: canvasClassName,
        ref: this.canvasRef })));


  }}


function App() {
  return /*#__PURE__*/(
    React.createElement("div", { className: "container" }, /*#__PURE__*/
    React.createElement(HomeButton, null)));


}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.querySelector("#app"));