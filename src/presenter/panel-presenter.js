import EventTypeFormView from '../view/event-type-form-view.js';
import {render, RenderPosition} from '../render.js';
import TripEventsItemView from '../view/trip-events-item-view.js';
import TripEventsListView from '../view/trip-events-list-view.js';
import SortEventView from '../view/sort-event-view.js';
import TripEventsView from '../view/trip-events-view.js';

export default class PanelPresenter {
  tripEventsView = new TripEventsView();
  tripEventsListView = new TripEventsListView();

  constructor({ container, pointsModel }) {
    this.container = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = this.pointsModel.getPoints();
    this.pointsDestinations = this.pointsModel.getTripDestinations();
    this.pointOffersByTypes = this.pointsModel.getOffersByType();

    this.points.forEach((points) => {
      render(new TripEventsItemView({ point: points, tripDestinations: this.pointsDestinations, allOffers: this.pointOffersByTypes}), this.tripEventsListView.getElement());
    });

    render(new SortEventView(), this.tripEventsView.getElement());
    render(new EventTypeFormView({point: this.points[0], tripDestinations: this.pointsDestinations, allOffers: this.pointOffersByTypes}), this.tripEventsListView.getElement(), RenderPosition.AFTERBEGIN);
    render(this.tripEventsListView, this.tripEventsView.getElement());
    render(this.tripEventsView, this.container);
  }
}
